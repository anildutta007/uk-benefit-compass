import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import { 
  Users, 
  PoundSterling, 
  MapPin, 
  Sparkles, 
  Globe2,
  ZoomIn,
  Layers
} from 'lucide-react';
import { UK_BENEFIT_EXPENDITURE } from '../data/ukExpenditureData';
import { UNSETTLED_MIGRANT_DATA } from '../data/unsettledMigrantData';
import { UK_REGIONS_GEOJSON } from '../data/ukRegionsGeoJson';

// Fix Leaflet default icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom HTML DivIcon for rendering real benefit labels directly on the map
const createRegionBadgeIcon = (name: string, value: string, percent: number, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-map-pill',
    html: `
      <div style="
        background-color: ${isSelected ? '#164232' : '#F8F3E8'};
        color: ${isSelected ? '#F8F3E8' : '#1F5A45'};
        border: 2px solid ${isSelected ? '#F3DD87' : '#1F5A45'};
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        padding: 4px 8px;
        border-radius: 8px;
        font-family: inherit;
        text-align: center;
        white-space: nowrap;
        pointer-events: auto;
        transform: translate(-50%, -50%);
        font-size: 11px;
        font-weight: 800;
      ">
        <div style="font-size: 9.5px; opacity: 0.9;">${name}</div>
        <div style="color: ${isSelected ? '#F3DD87' : '#E9774F'}; font-size: 12px; font-weight: 900;">
          ${value} <span style="font-size: 10px;">(${percent}%)</span>
        </div>
      </div>
    `,
    iconSize: [100, 40],
    iconAnchor: [50, 20]
  });
};

export const UKRegionalMapVisualizer: React.FC = () => {
  const [metricMode, setMetricMode] = useState<'general' | 'migrants'>('general');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('North West');
  const [tileStyle, setTileStyle] = useState<'standard' | 'humanitarian'>('standard');

  const welfareData = UK_BENEFIT_EXPENDITURE.regions;
  const migrantData = UNSETTLED_MIGRANT_DATA.regionalDispersal;

  const getRegionWelfare = (name: string) => {
    return welfareData.find(r => 
      r.region.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(r.region.toLowerCase())
    ) || welfareData[0];
  };

  const getRegionMigrant = (name: string) => {
    return migrantData.find(r => 
      r.region.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(r.region.toLowerCase())
    ) || migrantData[0];
  };

  const currentWelfare = getRegionWelfare(selectedRegionId);
  const currentMigrant = getRegionMigrant(selectedRegionId);

  // Map tiles choices
  const tileUrl = tileStyle === 'standard' 
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  const tileAttribution = tileStyle === 'standard'
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    : '&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap';

  return (
    <div className="bg-[#EFE8DA] rounded-2xl border-2 border-[#cad9ce] p-5 shadow-sm space-y-5">
      {/* Top Header & Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cad9ce] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45] flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Real Map (OpenStreetMap)
            </span>
            <span className="text-xs font-bold text-[#1F5A45]/80">
              Interactive Slippy Map with Zoom & Pan
            </span>
          </div>
          <h3 className="text-xl font-black text-[#1F5A45] mt-0.5 flex items-center gap-2">
            <span>Real UK Interactive Map: Regional Benefits & Percentage</span>
            <Sparkles className="w-4 h-4 text-[#E9774F]" />
          </h3>
          <p className="text-xs text-[#1F5A45]/80">
            Real satellite/street tiles just like Google Maps. Drag to pan, scroll to zoom in, and tap any UK region polygon to inspect.
          </p>
        </div>

        {/* Dataset Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#E2ECE5] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMetricMode('general')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                metricMode === 'general'
                  ? 'bg-[#1F5A45] text-white shadow-sm'
                  : 'text-[#1F5A45] hover:bg-[#cad9ce]'
              }`}
            >
              Total Welfare (£315.8bn)
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('migrants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                metricMode === 'migrants'
                  ? 'bg-[#E9774F] text-white shadow-sm'
                  : 'text-[#1F5A45] hover:bg-[#cad9ce]'
              }`}
            >
              Unsettled Migrants (118.5k)
            </button>
          </div>

          {/* Map Layer Switcher */}
          <button
            type="button"
            onClick={() => setTileStyle(tileStyle === 'standard' ? 'humanitarian' : 'standard')}
            className="px-2.5 py-1.5 rounded-xl border border-[#cad9ce] bg-[#F8F3E8] hover:bg-[#cad9ce] text-xs font-bold text-[#1F5A45] flex items-center gap-1.5 transition-colors"
            title="Toggle Map Style"
          >
            <Layers className="w-3.5 h-3.5 text-[#E9774F]" />
            <span>{tileStyle === 'standard' ? 'Clean Style' : 'Street Style'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Leaflet Map on Left, Detailed Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEAFLET INTERACTIVE MAP CONTAINER */}
        <div className="lg:col-span-8 bg-[#F8F3E8] p-3 rounded-xl border border-[#cad9ce] shadow-inner relative flex flex-col">
          
          <div className="flex items-center justify-between text-xs text-[#1F5A45] mb-2 font-bold px-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E9774F]" />
              Real UK OpenStreetMap with Benefit Overlays
            </span>
            <span className="text-[11px] text-[#1F5A45]/70 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
              Use scroll or +/- buttons to zoom
            </span>
          </div>

          {/* Map Canvas */}
          <div className="w-full h-[580px] rounded-xl overflow-hidden border border-[#cad9ce] relative z-0">
            <MapContainer
              center={[54.6, -3.2]} // Center of UK
              zoom={6}
              scrollWheelZoom={true}
              className="w-full h-full"
              style={{ background: '#E2ECE5' }}
            >
              <TileLayer
                attribution={tileAttribution}
                url={tileUrl}
                maxZoom={14}
                minZoom={5}
              />

              {/* Render Regions Overlays */}
              {UK_REGIONS_GEOJSON.features.map((feature) => {
                const isSelected = selectedRegionId.toLowerCase().includes(feature.properties.name.toLowerCase()) || 
                                   feature.properties.name.toLowerCase().includes(selectedRegionId.toLowerCase());
                
                const w = getRegionWelfare(feature.properties.name);
                const m = getRegionMigrant(feature.properties.name);

                const percentage = metricMode === 'general' ? w.percentage : m.percentage;
                const displayVal = metricMode === 'general' ? `£${w.totalBillions}bn` : `${(m.supportedIndividuals / 1000).toFixed(1)}k`;

                // Convert [lng, lat] GeoJSON to Leaflet [lat, lng] format
                const coordinates = (feature.geometry.coordinates[0] as number[][]).map(
                  ([lng, lat]) => [lat, lng] as [number, number]
                );

                // Choropleth color styling
                const fillColor = isSelected
                  ? '#1F5A45'
                  : percentage >= 11
                  ? '#1F5A45'
                  : percentage >= 8
                  ? '#287358'
                  : '#E9774F';

                return (
                  <React.Fragment key={feature.properties.id}>
                    {/* Semi-transparent Polygon on the real map */}
                    <Polygon
                      positions={coordinates}
                      pathOptions={{
                        fillColor: fillColor,
                        fillOpacity: isSelected ? 0.65 : 0.45,
                        weight: isSelected ? 3.5 : 2,
                        color: isSelected ? '#F3DD87' : '#1F5A45',
                        dashArray: isSelected ? '' : '3',
                      }}
                      eventHandlers={{
                        click: () => {
                          setSelectedRegionId(feature.properties.name);
                        },
                      }}
                    >
                      <Tooltip sticky>
                        <div className="text-xs font-bold text-[#1F5A45]">
                          <div className="font-extrabold text-sm">{feature.properties.name}</div>
                          <div>Total Spend: <strong>{displayVal}</strong></div>
                          <div>UK Share: <strong>{percentage}%</strong></div>
                          <div className="text-[#E9774F]">Click to view full regional factsheet</div>
                        </div>
                      </Tooltip>
                    </Polygon>

                    {/* Prominent Label Marker directly on the real map */}
                    <Marker
                      position={feature.properties.center}
                      icon={createRegionBadgeIcon(
                        feature.properties.name,
                        displayVal,
                        percentage,
                        isSelected
                      )}
                      eventHandlers={{
                        click: () => {
                          setSelectedRegionId(feature.properties.name);
                        },
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>

          {/* Map Footer Note */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2.5 text-[11px] text-[#1F5A45]/80 px-1 mt-1">
            <span className="font-semibold flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#1F5A45] inline-block border border-[#F3DD87]" /> Selected Territory
              <span className="w-3.5 h-3.5 rounded bg-[#287358]/80 inline-block border border-[#cad9ce] ml-2" /> Regional Shading
            </span>
            <span className="font-bold text-[#1F5A45]">
              Active: {currentWelfare.region} ({metricMode === 'general' ? `£${currentWelfare.totalBillions}bn • ${currentWelfare.percentage}% of UK` : `${currentMigrant.supportedIndividuals.toLocaleString()} migrants`})
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: SELECTED REGION FACTSHEET */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#F8F3E8] p-5 rounded-xl border border-[#cad9ce] space-y-4 shadow-sm">
            <div className="border-b border-[#cad9ce] pb-3">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#F3DD87] text-[#1F5A45]">
                Regional Factsheet
              </span>
              <h4 className="text-2xl font-black text-[#1F5A45] mt-1 flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-[#E9774F]" />
                {currentWelfare.region}
              </h4>
              <p className="text-xs text-[#1F5A45]/80 mt-0.5">
                Estimated Regional Population: ~{currentWelfare.populationMillions}m
              </p>
            </div>

            {/* Metric 1: Total Welfare Bill */}
            <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce]">
              <div className="flex items-center justify-between text-xs text-[#1F5A45]/70 font-semibold mb-1">
                <span>Total Annual Welfare Bill</span>
                <span className="text-xs font-black text-[#1F5A45]">{currentWelfare.percentage}% of UK</span>
              </div>
              <div className="text-2xl font-black text-[#1F5A45]">
                £{currentWelfare.totalBillions} billion
              </div>
              <div className="w-full bg-[#cad9ce] h-2 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-[#1F5A45] h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(currentWelfare.totalBillions / 45) * 100}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Per Capita Spend */}
            <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#1F5A45]/70 block">
                  Per Capita Welfare Spend
                </span>
                <span className="text-xl font-black text-[#E9774F]">
                  £{currentWelfare.perCapitaSpend.toLocaleString()} <span className="text-xs font-normal text-[#1F5A45]">/resident</span>
                </span>
              </div>
              <PoundSterling className="w-6 h-6 text-[#1F5A45]/40" />
            </div>

            {/* Metric 3: Working Age Claimants */}
            <div className="bg-[#EFE8DA] p-3.5 rounded-xl border border-[#cad9ce] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#1F5A45]/70 block">
                  Benefit Claimants
                </span>
                <span className="text-xl font-black text-[#1F5A45]">
                  {currentWelfare.claimantsThousands}k <span className="text-xs font-normal text-[#1F5A45]">claimants</span>
                </span>
              </div>
              <Users className="w-6 h-6 text-[#1F5A45]/40" />
            </div>

            {/* Metric 4: Unsettled Migrants in This Region */}
            <div className="bg-[#E2ECE5] p-3.5 rounded-xl border-2 border-[#1F5A45]/30">
              <div className="flex items-center justify-between text-xs font-bold text-[#1F5A45] mb-1">
                <span>Unsettled Migrants (Home Office)</span>
                <span className="text-xs font-extrabold text-[#E9774F]">{currentMigrant.percentage}% of UK</span>
              </div>
              <div className="text-xl font-black text-[#1F5A45]">
                {currentMigrant.supportedIndividuals.toLocaleString()} <span className="text-xs font-normal text-[#1F5A45]">people</span>
              </div>
              <p className="text-[10px] text-[#1F5A45]/80 mt-1 leading-snug">
                Supported under Section 95 / Section 4 accommodation dispersal across local councils.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
