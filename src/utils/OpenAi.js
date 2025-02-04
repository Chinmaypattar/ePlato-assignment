import { HfInference } from "@huggingface/inference";




const client = new HfInference(process.env.REACT_APP_HF_API_KEY)

export const handleSendMessage = async (message) => {
  try {


    let out = "";


    // Call the chatCompletionStream method
    const stream = client.chatCompletionStream({
      model: 'google/gemma-2-2b-it', // The model to use
      messages: [
        { role: 'user', content: message }, // User message
      ],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.7,
    });

    // Handle incoming stream data
    for await (const chunk of stream) {
      if (chunk.choices?.length > 0 && chunk.choices[0].delta.content) {
        out += chunk.choices[0].delta.content;
      }
    }
    return out;


  }
  catch (error) {
    console.error("Error fetching AI response:", error);
    return "An error occurred while processing your request.";
  }
}

