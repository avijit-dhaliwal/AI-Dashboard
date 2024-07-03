const axios = require('axios');

module.exports = async (req, res) => {
  const { model, input } = req.body;
  const axios = require('axios');


  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
  
  try {
    let result, explanation;
    
    switch(model) {
      case 'gpt2':
      case 't5':
      case 'bert':
      case 'roberta':
      case 'xlnet':
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/${getModelName(model)}`,
          { inputs: input },
          { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );
        result = response.data;
        explanation = "Explanation not available for this model via API";
        break;
      
      case 'vit':
      case 'resnet50':
      case 'vgg16':
      case 'inception_v3':
        result = { message: "Image classification should be done client-side using TensorFlow.js" };
        explanation = "Client-side processing, no explanation available";
        break;
      
      case 'wav2vec2':
        result = { message: "Audio processing not implemented in this example" };
        explanation = "Audio processing not implemented";
        break;
      
      case 'vilt':
        const viltResponse = await axios.post(
          'https://api-inference.huggingface.co/models/dandelin/vilt-b32-finetuned-vqa',
          { inputs: { image: input.image, question: input.question } },
          { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );
        result = viltResponse.data;
        explanation = "Explanation not available for this model via API";
        break;
      
      default:
        throw new Error('Unknown model');
    }
    
    res.json({ result, explanation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function getModelName(model) {
  const modelNames = {
    'gpt2': 'gpt2',
    't5': 't5-base',
    'bert': 'bert-base-uncased',
    'roberta': 'roberta-base',
    'xlnet': 'xlnet-base-cased'
  };
  return modelNames[model];
}