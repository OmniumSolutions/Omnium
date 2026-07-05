const fs = require('fs');
let appContent = fs.readFileSync('src/components/AIDemo.tsx', 'utf8');

const helperFunctions = `  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchAsBase64 = async (url: string): Promise<string | null> => {
    if (url.startsWith('data:')) return url;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await blobToBase64(blob);
    } catch (e) {
      console.error("Failed to fetch image", e);
      return null;
    }
  };

  const sendToBackend = async (userMsg: Message) => {
    setIsPending(true);
    let imagePayload = null;
    let audioPayload = null;
    
    if (userMsg.image) {
      const base64 = await fetchAsBase64(userMsg.image);
      if (base64) {
        imagePayload = { data: base64, mimeType: selectedImageMime || "image/jpeg" };
      }
    }
    
    if (userMsg.audioUrl && audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const base64 = await blobToBase64(audioBlob);
      audioPayload = { data: base64, mimeType: 'audio/webm' };
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          image: imagePayload,
          audio: audioPayload
        })
      });
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.text || "Desculpe, ocorreu um erro.",
        timestamp: new Date(),
        isSimulated: data.simulated
      };

      setMessages(prev => [...prev, assistantMsg]);
      
      if (autoSpeak) {
        speakResponse(assistantMsg.text, assistantMsg.id);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Desculpe, ocorreu um erro de conexão com o servidor.",
        timestamp: new Date(),
        isSimulated: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsPending(false);
      if (userMsg.audioUrl) {
         setAudioChunks([]);
      }
    }
  };

`;

appContent = appContent.replace(
  'const handleSendMessage = (e?: React.FormEvent) => {',
  helperFunctions + 'const handleSendMessage = (e?: React.FormEvent) => {'
);

appContent = appContent.replace(
  /setTimeout\(\(\) => \{[\s\S]*?\}, 1500\);/g,
  `sendToBackend(userMsg);`
);

appContent = appContent.replace(
  /setTimeout\(\(\) => \{[\s\S]*?\}, 2000\);/g,
  `sendToBackend(userMsg);`
);

// We need to NOT clear audioChunks before sendToBackend in onstop
appContent = appContent.replace(
  'setMessages(prev => [...prev, userMsg]);\n        setAudioChunks([]);\n        setRecordingSeconds(0);\n        setIsPending(true);\n        \n        sendToBackend(userMsg);',
  'setMessages(prev => [...prev, userMsg]);\n        setRecordingSeconds(0);\n        sendToBackend(userMsg);'
);

fs.writeFileSync('src/components/AIDemo.tsx', appContent);
