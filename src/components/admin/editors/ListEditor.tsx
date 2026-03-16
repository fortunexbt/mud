"use client";

interface ListEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}

export function ListEditor({ label, items, onChange }: ListEditorProps) {
  const handleAdd = () => {
    onChange([...items, ""]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-3 rounded-[1.2rem] border border-outline/30 bg-surface/20 p-4">
      <p className="text-sm font-semibold capitalize text-ink">{label}</p>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <textarea
            value={item}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="min-h-[4rem] w-full rounded-[1rem] border border-outline/60 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
          <button
            type="button"
            onClick={() => handleRemove(idx)}
            className="flex h-[4rem] w-[4rem] shrink-0 items-center justify-center rounded-[1rem] border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-sm font-medium text-terracotta hover:underline"
      >
        + Adicionar item
      </button>
    </div>
  );
}
