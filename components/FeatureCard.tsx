import Link from "next/link";

interface FeatureCardProps {
  title: string;
  items: string[];
  link: string;
  linkText: string;
  gradient: string;
  icon: string;
}

export function FeatureCard({ title, items, link, linkText, gradient, icon }: FeatureCardProps) {
  return (
    <div className="group relative glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {title}
        </h3>
        
        {/* Items */}
        <ul className="space-y-2 mb-6 min-h-[120px]">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm opacity-80 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span className="line-clamp-2">{item}</span>
            </li>
          ))}
        </ul>
        
        {/* Link */}
        <Link 
          href={link}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
        >
          {linkText}
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
