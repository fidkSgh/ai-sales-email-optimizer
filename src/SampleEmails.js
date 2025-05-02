import React from 'react';

const sampleEmailsData = [
  {
    id: 1,
    title: 'Cold Outreach Introduction',
    content: `Subject: Quick Question about [Prospect's Company]

Hi [Prospect Name],

My name is [Your Name] from [Your Company]. We help companies like yours [mention specific benefit, e.g., improve their sales pipeline velocity].

I noticed [mention something specific, e.g., your recent company announcement] and thought our solution might be relevant.

Would you be open to a brief 15-minute chat next week to explore if this could be valuable for [Prospect's Company]?

Best,
[Your Name]
[Your Title]
[Your Contact Info]`
  },
  {
    id: 2,
    title: 'Follow-up After Meeting',
    content: `Subject: Following Up - [Your Company] & [Prospect's Company]

Hi [Prospect Name],

Great chatting with you earlier today about [mention key discussion point]. I really enjoyed learning more about your goals at [Prospect's Company].

As promised, here's the link to [mention resource, e.g., case study, demo] we discussed: [Link]

Let me know if you have any questions after reviewing it. I'm happy to schedule another call to dive deeper.

Best regards,
[Your Name]`
  },
  {
    id: 3,
    title: 'Product Feature Update',
    content: `Subject: New Feature Alert: [Feature Name] is Here!

Hi [Customer Name],

Exciting news! We've just launched [Feature Name], a new capability in [Your Product] designed to help you [mention benefit].

You can learn more about it here: [Link to blog post or docs]

We think this will make a big difference in how you [mention task related to feature]. Let us know what you think!

Thanks,
The [Your Company] Team`
  },
];

function SampleEmails({ onSampleSelect }) {
  return (
    <div className="w-full lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Sample Emails (Examples)</h2>
      <div className="space-y-4">
        {sampleEmailsData.map((sample) => (
          <div key={sample.id} className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-2">{sample.title}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-3">{sample.content}</p>
            <button
              onClick={() => onSampleSelect(sample.content)}
              className="w-full text-center px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded-md"
            >
              Use This Sample
            </button>
          </div>
        ))}
      </div>
       <p className="text-xs text-gray-500 mt-4 text-center">Click "Use This Sample" to load into the editor.</p>
    </div>
  );
}

export default SampleEmails; 