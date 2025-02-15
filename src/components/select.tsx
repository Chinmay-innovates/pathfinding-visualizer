import { ChangeEvent } from "react";

interface SelectProps {
	value: string | number;
	label: string;
	onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string | number; name: string }[];
	isDisabled?: boolean;
}
export const Select = ({
	label,
	onChange,
	options,
	value,
	isDisabled,
}: SelectProps) => {
	return (
		<div className="flex items-center gap-2 m-12">
			<label htmlFor={label} className="text-sm font-medium text-gray-300">
				{label}
			</label>
			<select
				id={label}
				value={value}
				onChange={onChange}
				disabled={isDisabled}
				className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in-out p-2  min-w-[200px] sm:min-w-full rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};
