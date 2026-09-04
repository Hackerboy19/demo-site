import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Clock, Users, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { STATS_DATA } from '../data/products';

interface TiltCardProps {
  stat: typeof STATS_DATA[0];
  index: number;
}

function StatTiltCard({ stat, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (id: string) => {
    switch (id) {
      case 'experience':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'certification':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'staff':
        return <Users className="w-5 h-5 text-sky-600" />;
      case 'material':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'experience':
        return 'bg-blue-50 border-blue-100';
      case 'certification':
        return 'bg-emerald-50 border-emerald-100';
      case 'staff':
        return 'bg-sky-50 border-sky-100';
      case 'material':
        return 'bg-indigo-50 border-indigo-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle 3D tilt angles (capped at ±8deg)
    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'scale3d(1.025, 1.025, 1.025)' : 'scale3d(1, 1, 1)'
          }`,
          transition: isHovered
            ? 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)'
            : 'transform 0.5s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className="relative group rounded-2xl p-6 bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xs ${getIconBg(stat.id)}`}>
            {getIcon(stat.id)}
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
            {stat.highlight}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1.5">
            <span>{stat.value}</span>
            {stat.id === 'certification' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 inline" />
            )}
          </div>
          <div className="text-sm font-semibold text-slate-700">{stat.label}</div>
          <p className="text-xs text-slate-500 leading-relaxed pt-1">
            {stat.description}
          </p>
        </div>

        {/* Ambient verified indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>STANDARD METRIC</span>
          <span className="text-emerald-600 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
            VERIFIED
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="relative z-20 py-12 -mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS_DATA.map((stat, index) => (
          <StatTiltCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
