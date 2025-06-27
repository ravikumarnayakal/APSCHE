
import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyHero } from "@/components/PropertyHero";
import { PropertyModal } from "@/components/PropertyModal";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, San Francisco",
    price: 3200,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    description: "Beautiful modern apartment with city views, fully furnished with high-end appliances and amenities.",
    amenities: ["WiFi", "Parking", "Gym", "Pool", "Laundry"],
    owner: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com"
    }
  },
  {
    id: 2,
    title: "Cozy Studio Near Campus",
    location: "University District, Berkeley",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    description: "Perfect for students or young professionals. Walking distance to campus and public transportation.",
    amenities: ["WiFi", "Study Area", "Shared Kitchen", "Bike Storage"],
    owner: {
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@email.com"
    }
  },
  {
    id: 3,
    title: "Luxury Family Home",
    location: "Suburban Hills, Palo Alto",
    price: 5500,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    ],
    description: "Spacious family home with private garden, perfect for families looking for comfort and luxury.",
    amenities: ["Garden", "Garage", "WiFi", "Security System", "Pool"],
    owner: {
      name: "Michael Chen",
      phone: "+1 (555) 456-7890",
      email: "m.chen@email.com"
    }
  }
];

const Index = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 0
  });

  const handleSearch = (searchTerm: string) => {
    console.log("Search function called with:", searchTerm);
    setFilters(prev => ({ ...prev, location: searchTerm }));
  };

  useEffect(() => {
    console.log("Filters changed:", filters);
    let filtered = properties;

    // Location filtering - check if location search term matches any part of the property location
    if (filters.location && filters.location.trim() !== "") {
      const searchTerm = filters.location.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const locationMatch = p.location.toLowerCase().includes(searchTerm);
        const titleMatch = p.title.toLowerCase().includes(searchTerm);
        return locationMatch || titleMatch;
      });
      console.log("After location filter:", filtered.length, "properties");
    }

    // Price filtering
    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    console.log("After price filter:", filtered.length, "properties");

    // Bedroom filtering
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
      console.log("After bedroom filter:", filtered.length, "properties");
    }

    console.log("Final filtered properties:", filtered);
    setFilteredProperties(filtered);
  }, [filters, properties]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PropertyHero onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <PropertyFilters filters={filters} onFiltersChange={setFilters} />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {filteredProperties.length} Properties Available
          </h2>
          <p className="text-gray-600">Find your perfect rental home</p>
          {filters.location && (
            <p className="text-sm text-blue-600 mt-1">
              Searching for: "{filters.location}"
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={() => setSelectedProperty(property)}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
            <p className="text-gray-500">
              {filters.location ? 
                `No properties found for "${filters.location}". Try a different location or adjust your filters.` :
                "Try adjusting your search filters"
              }
            </p>
          </div>
        )}
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default Index;
