interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <p className="text-sm font-medium text-zinc-600 animate-pulse dark:text-zinc-300">
        {message}
      </p>
    </div>
  );
}
