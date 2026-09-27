const generateDataset = () => {
  const dataset = [];

  const posTemplates = [
    "I absolutely love this product, it works brilliantly!",
    "The customer service was exceptionally helpful and friendly.",
    "This was a wonderful experience overall.",
    "The quality of this item exceeded my expectations.",
    "I am very happy with the quick delivery and packaging.",
    "Great value for money, highly recommended!",
    "The user interface is slick, intuitive, and responsive.",
    "An outstanding performance by the whole team today.",
    "This new update fixed all my issues seamlessly.",
    "I feel extremely satisfied and delighted with my purchase."
  ];

  const negTemplates = [
    "I am extremely disappointed with this purchase.",
    "The service was terribly slow and rude.",
    "This app keeps crashing, it is completely useless.",
    "Poor quality material and terrible build overall.",
    "I regret buying this product; absolute waste of money.",
    "The software update broke several essential features.",
    "Horrible experience, I will never order again.",
    "The item arrived damaged and late.",
    "Customer support was completely unhelpful and disrespectful.",
    "Very frustrating interface and full of annoying bugs."
  ];

  const neuTemplates = [
    "The package arrived at the scheduled time today.",
    "The meeting will take place at 3 PM in room B.",
    "I received the document via email this morning.",
    "The store opens at 9 AM and closes at 8 PM.",
    "Please read the instructions carefully before submitting.",
    "The flight departs in two hours from terminal 1.",
    "The report contains standard quarterly statistical data.",
    "It is currently 22 degrees outside with moderate breeze.",
    "The file has been uploaded to the shared folder.",
    "The train stops at three main stations along the route."
  ];

  for (let i = 1; i <= 200; i++) {
    const pText = `${posTemplates[i % 10]} (Sample ID ${i})`;
    const nText = `${negTemplates[i % 10]} (Sample ID ${i})`;
    const neuText = `${neuTemplates[i % 10]} (Sample ID ${i})`;

    dataset.push({ id: i, text: pText, sentiment: 'Positive' });
    dataset.push({ id: i + 200, text: nText, sentiment: 'Negative' });
    dataset.push({ id: i + 400, text: neuText, sentiment: 'Neutral' });
  }

  return dataset;
};

module.exports = { generateDataset };