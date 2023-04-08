import { TextInput } from "flowbite-react";

type FilterComponentProps = {
  label: number;
  value: string;
  onChange: (value: string) => void;
};

const FilterComponent = ({ label, value, onChange }: FilterComponentProps) => {
  return (
    <div className="flex items-center w-80 justify-between">
      <div className="bg-sky-600 text-white rounded-lg p-1.5 min-w-[40px] font-bold text-lg h-7 flex items-center justify-center">
        {label}
      </div>
      <TextInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="Filter podcasts..."
        className="w-64 border-red-800"
      />
    </div>
  );
};

export default FilterComponent;
