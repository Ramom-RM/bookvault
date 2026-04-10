import React from 'react';

interface SkeletonProps {
  count?: number;
  variant?: 'book' | 'text' | 'card';
}

const BookSkeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    <div className="aspect-[2/3] bg-slate-800 rounded-lg" />
    <div className="h-4 bg-slate-800 rounded w-3/4" />
    <div className="h-3 bg-slate-800 rounded w-1/2" />
    <div className="h-2 bg-slate-800 rounded w-1/4" />
  </div>
);

const TextSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-6 bg-slate-800 rounded w-3/4" />
    <div className="h-4 bg-slate-800 rounded w-full" />
    <div className="h-4 bg-slate-800 rounded w-5/6" />
  </div>
);

const CardSkeleton: React.FC = () => (
  <div className="glass-card p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-slate-800 rounded w-1/2" />
    <div className="h-4 bg-slate-800 rounded w-full" />
    <div className="h-4 bg-slate-800 rounded w-4/5" />
    <div className="h-10 bg-slate-800 rounded" />
  </div>
);

const Skeleton: React.FC<SkeletonProps> = ({ count = 1, variant = 'text' }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'book':
        return <BookSkeleton />;
      case 'card':
        return <CardSkeleton />;
      case 'text':
      default:
        return <TextSkeleton />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default Skeleton;
