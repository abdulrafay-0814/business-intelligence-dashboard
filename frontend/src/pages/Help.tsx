import { HelpCircle, Mail, MessageCircle, Book, ChevronRight } from 'lucide-react';

const Help = () => {
  const faqs = [
    { q: 'How do I add a new customer?', a: 'Go to Customers page and click "Add Customer" button.' },
    { q: 'How can I export data?', a: 'Use the "Export CSV" button on the Customers or Reports page.' },
    { q: 'How do I change theme?', a: 'Click the sun/moon icon in the header or go to Settings.' },
    { q: 'How do I delete a customer?', a: 'Click the delete icon on the customer row in Customers page.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Help & Support
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Get help and find answers to common questions.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Mail, title: 'Email Support', desc: 'support@teyzix.com', gradient: 'from-indigo-500 to-purple-600' },
          { icon: MessageCircle, title: 'Live Chat', desc: 'Available 24/7', gradient: 'from-emerald-500 to-teal-600' },
          { icon: Book, title: 'Documentation', desc: 'Browse docs & guides', gradient: 'from-amber-500 to-orange-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all cursor-pointer">
            <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3 mt-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{faq.q}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{faq.a}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;