
import React from 'react';

export const TechStack: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 pt-6">
      <header className="max-w-xl">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Tech Stack</h1>
        <p className="text-gray-400 font-light tracking-wide">The architectural foundation and external dependencies powering Maison Julian.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Core Infrastructure */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Infrastructure</h3>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">V1.2 Stable</span>
          </div>
          <div className="space-y-4">
            {[
              { category: 'Frontend', tool: 'React / Next.js', status: 'Implemented', icon: '⚛️' },
              { category: 'Backend', tool: 'Node.js / GraphQL', status: 'Active', icon: '🚀' },
              { category: 'Ledger', tool: 'Polygon / Ethereum', status: 'Review', icon: '⛓️' },
              { category: 'Database', tool: 'PostgreSQL / Prisma', status: 'Stable', icon: '🗄️' },
            ].map((stack, i) => (
              <div key={i} className="bg-white p-6 rounded-[30px] soft-shadow border border-gray-50 flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl group-hover:bg-indigo-50 transition-colors">{stack.icon}</div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stack.category}</p>
                    <p className="text-sm font-bold text-gray-900">{stack.tool}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${stack.status === 'Review' ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}>
                  {stack.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Hub */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Third-Party Integrations</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Sync</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Stripe', use: 'Payments', logo: '💳' },
              { name: 'AWS', use: 'Cloud', logo: '☁️' },
              { name: 'Twilio', use: 'Comms', logo: '📱' },
              { name: 'Algolia', use: 'Search', logo: '🔍' },
              { name: 'Intercom', use: 'Support', logo: '💬' },
              { name: 'Segment', use: 'Analytics', logo: '📊' }
            ].map((tool, i) => (
              <div key={i} className="bg-gray-50/50 p-6 rounded-[30px] border border-gray-100 hover:bg-white hover:soft-shadow transition-all group cursor-pointer text-center">
                <div className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{tool.logo}</div>
                <p className="text-[11px] font-bold text-gray-900">{tool.name}</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">{tool.use}</p>
              </div>
            ))}
            <div className="p-6 rounded-[30px] border border-dashed border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-400 transition-all cursor-pointer">
              + New API
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
