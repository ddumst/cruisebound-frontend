"use client";

import CruisebounIcon from "@/components/icons/CruisebounIcon";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { FiFilter, FiArrowLeft } from "react-icons/fi";
import Button from "@/components/Button";
import { useSailing } from "@/hooks/useSailing";
import Card from "@/components/Card";;
import Skeleton from "@/components/Skeleton";
import { IoMdStar } from "react-icons/io";
import Itinerary from "@/components/Itinerary";
import { formatDateRange } from "@/utils/formatDateRange";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";

enum SortTypes {
  PriceLowToHigh = "price-low-to-high",
  PriceHighToLow = "price-high-to-low",
  DepartureDateCloseToNow = "departure-date-close-to-now",
  DepartureDateFarToNow = "departure-date-far-to-now",
  DurationLowToHigh = "duration-low-to-high",
  DurationHighToLow = "duration-high-to-low",
}

export default function TripsPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    departurePort: "",
    cruiseLine: "",
    sortType: SortTypes.PriceLowToHigh,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { data, isLoading } = useSailing();

  const filteredItems = useMemo(() => {
    return data?.items?.filter((sailing) => {
      const departurePort = sailing.itinerary[0] || "";
      const matchesDeparturePort = departurePort
        .toLowerCase()
        .includes(filters.departurePort.toLowerCase());
      const matchesCruiseLine = sailing.ship.line.name
        .toLowerCase()
        .includes(filters.cruiseLine.toLowerCase());
  
      return matchesDeparturePort && matchesCruiseLine;
    }) || []
  }, [data?.items, filters.cruiseLine, filters.departurePort]);

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (filters.sortType) {
      case "price-low-to-high":
        return a.price - b.price;
  
      case "price-high-to-low":
        return b.price - a.price;
  
      case "departure-date-close-to-now":
        return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
  
      case "departure-date-far-to-now":
        return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
  
      case "duration-low-to-high":
        return a.duration - b.duration;
  
      case "duration-high-to-low":
        return b.duration - a.duration;
  
      default:
        return 0;
    }
  });

  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-white">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 bg-sidebar shadow-md transition-all duration-300 transform",
          showSidebar ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static",
          isCollapsed ? "w-16" : "w-64",
          "flex flex-col items-center"
        )}
      >
        <div className="p-4 flex flex-col items-end gap-4">
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="only-icon"
            className="hidden lg:flex"
          >
            <FiArrowLeft className={cn(isCollapsed ? "rotate-180" : "")} />
          </Button>

          {!isCollapsed && (
            <>
              <div className="flex flex-col gap-1 w-full">
                <label className="mb-0 text-white" htmlFor="">
                  Departure port
                </label>
                <input
                  type="text"
                  placeholder="Any port"
                  value={filters.departurePort}
                  onChange={(e) =>
                    setFilters({ ...filters, departurePort: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="mb-0 text-white" htmlFor="">
                  Cruiseline
                </label>
                <input
                  type="text"
                  placeholder="Any ship"
                  value={filters.cruiseLine}
                  onChange={(e) =>
                    setFilters({ ...filters, cruiseLine: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center mt-auto mb-8">
          <CruisebounIcon className={cn(isCollapsed ? "w-8 h-8" : "w-16 h-16")} />
          <h3
            className={cn(
              "font-rebond-grotesque-bold text-white m-0 p-0 text-2xl md:text-3.5xl transition-all",
              isCollapsed ? "opacity-0 text-xs" : "opacity-100"
            )}
          >
            Cruisebound
          </h3>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between p-4 bg-white shadow lg:hidden">
          <h1 className="text-xl font-bold">Trips</h1>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 text-gray-600 bg-gray-200 rounded-lg lg:hidden"
          >
            <FiFilter size={24} />
          </button>
        </header>

        <main className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" height="24px" width="240px" />
              <Skeleton variant="rectangular" height="24px" width="120px" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 justify-start w-full">
                <h2 className="text-lg font-semibold">{filteredItems.length} trips found</h2>
                <Button 
                  className="border border-gray-400 text-black rounded-lg text-xs py-1.5"
                  onClick={() => setFilters({ departurePort: "", cruiseLine: "", sortType: SortTypes.PriceLowToHigh })}
                >
                  Reset filters
                </Button>
              </div>

              <div className="flex w-full gap-2 items-center justify-end">
                <span className="block">Sort by</span>
                <SortDropdown
                  sortType={filters.sortType}
                  onSortChange={(newSort) => setFilters({ ...filters, sortType: newSort as SortTypes })}
                />
              </div>
            </>
          )}
          </div>

          <div className="flex flex-wrap gap-4">
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" height="192px" className="w-full" />
                <Skeleton variant="rectangular" height="192px" className="w-full" />
                <Skeleton variant="rectangular" height="192px" className="w-full" />
                <Skeleton variant="rectangular" height="192px" className="w-full" />
              </>
            ) : (
              <>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((sailing, index) => (
                    <Card key={index}>
                      <div className="flex relative w-full sm:w-64 h-full">
                        <Image
                          src={sailing.ship.image || "/assets/placeholder.png"}
                          alt={sailing.name}
                          className="rounded-tl-lg h-full w-full sm:w-64 object-cover"
                          width={500}
                          height={500}
                        />

                        <div className="absolute rounded-lg bg-black bg-opacity-80 py-1 px-2 top-2 left-2 text-white text-xs">
                          {formatDateRange(sailing.departureDate, sailing.returnDate)}
                        </div>

                        <div className="block sm:hidden absolute rounded-lg bg-black bg-opacity-80 py-1 px-2 top-2 right-2 text-white text-xs">
                          <div className="rating flex items-center gap-1">
                            <IoMdStar className="text-yellow-500" />
                            <span>{sailing.ship.rating}</span>
                            <div className="text-gray-400 text-xs">
                              {sailing.ship.reviews} reviews
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col bg-white w-full h-full">
                        <div className="flex p-4 gap-4 flex-1">
                          <div className="flex flex-col gap-1 flex-1">
                            <h3 className="text-lg font-bold">
                              {sailing.name}
                            </h3>
                            <div className="flex gap-4 text-gray-800 font-medium">
                              <span>{sailing.region}</span>
                              <span>{sailing.duration} nights</span>
                              <div className="rating hidden sm:flex items-center gap-1">
                                <IoMdStar className="text-yellow-500" />
                                <span>{sailing.ship.rating}</span>
                                <div className="text-gray-400 text-xs">
                                  {sailing.ship.reviews} reviews
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            {sailing.ship.line.logo ? (
                              <Image
                                src={sailing.ship.line.logo}
                                alt={sailing.ship.line.name}
                                className="w-24 h-10 object-contain object-right"
                                width={200}
                                height={200}
                              />
                            ) : null}
                            <p className="text-gray-400 text-xs">{sailing.ship.line.name}</p>
                          </div>
                        </div>
                        <div className="flex w-full p-4 pt-0">
                          <Itinerary itinerary={sailing.itinerary} maxVisible={4} />
                        </div>
                        <div className="flex gap-4 justify-end bg-[#f5f5f5] p-4 h-20 items-center">
                          <div className="flex flex-col items-end text-gray-900">
                            <span className="text-gray-400 text-xs">Interior from </span>
                            <div className="flex items-start font-bold text-2xl leading-none">
                              <span className="text-sm">$</span>
                              {sailing.price}
                            </div>
                          </div>
                          <Button onClick={() => console.log("See sailings")} variant="primary" className="p-2 h-10">
                            See sailings
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="w-full p-6 text-center text-gray-600 bg-[#f5f5f5]">
                    No trips match your filters. Try adjusting the criteria.
                  </Card>
                )}
              </>
            )}
          </div>
          
          <div className="inline-flex rounded-lg bg-[#f5f5f5] mt-6 p-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
