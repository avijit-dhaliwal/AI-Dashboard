import React, { useState } from 'react';

function InputArea({ model, onInputChange }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
    onInputChange(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      onInputChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!model) return null;

  const isTextModel = ['gpt2', 't5', 'bert', 'roberta', 'xlnet'].includes(model);
  const isImageModel = ['vit', 'resnet50', 'vgg16', 'inception_v3'].includes(model);
  const isAudioModel = model === 'wav2vec2';
  const isMultimodalModel = model === 'vilt';

  return (
    <div>
      {isTextModel && (
        <textarea value={text} onChange={handleTextChange} placeholder="Enter text" />
      )}
      {(isImageModel || isAudioModel || isMultimodalModel) && (
        <input type="file" onChange={handleFileChange} accept={isAudioModel ? "audio/*" : "image/*"} />
      )}
      {isMultimodalModel && (
        <textarea value={text} onChange={handleTextChange} placeholder="Enter question" />
      )}
    </div>
  );
}

export default InputArea;