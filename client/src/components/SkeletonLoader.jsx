import React from 'react';

export const RestaurantCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-44 w-full bg-slate-200" />
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-slate-200 rounded w-12" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
      </div>
    </div>
  );
};

export const MenuItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-6 border-b border-slate-100 animate-pulse gap-4">
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-slate-200 rounded w-8" />
        <div className="h-5 bg-slate-200 rounded w-1/2" />
        <div className="h-4 bg-slate-200 rounded w-20" />
        <div className="h-3 bg-slate-200 rounded w-3/4" />
      </div>
      <div className="w-28 h-24 bg-slate-200 rounded-xl shrink-0" />
    </div>
  );
};

export const GridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default { RestaurantCardSkeleton, MenuItemSkeleton, GridSkeleton };
