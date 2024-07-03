import React from 'react';

const models = [
  'gpt2', 't5', 'bert', 'roberta', 'xlnet', 'vit', 'resnet50', 'vgg16', 'inception_v3', 'wav2vec2', 'vilt'
];

function ModelSelector({ onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a model</option>
      {models.map(model => (
        <option key={model} value={model}>{model}</option>
      ))}
    </select>
  );
}

export default ModelSelector;