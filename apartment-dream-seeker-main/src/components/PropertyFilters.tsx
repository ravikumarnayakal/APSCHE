
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Filters {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
}

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const PropertyFilters = ({ filters, onFiltersChange }: PropertyFiltersProps) => {
  return (
    <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="minPrice" className="text-sm font-medium text-gray-700">
            Min Price
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="$0"
            value={filters.minPrice || ""}
            onChange={(e) => onFiltersChange({ ...filters, minPrice: Number(e.target.value) || 0 })}
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
            Max Price
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="$10,000"
            value={filters.maxPrice || ""}
            onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) || 10000 })}
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">
            Min Bedrooms
          </Label>
          <Select
            value={filters.bedrooms.toString()}
            onValueChange={(value) => onFiltersChange({ ...filters, bedrooms: Number(value) })}
          >
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Quick Actions
          </Label>
          <div className="flex gap-2">
            <button
              onClick={() => onFiltersChange({ location: "", minPrice: 0, maxPrice: 10000, bedrooms: 0 })}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
