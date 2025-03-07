import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { RootHistorys, RootHistorysSetBlank } from '../../../api/Reports';
import { RxCross2 } from 'react-icons/rx';
import { DateAndTime } from '../../../common/DateAndTime';

const Mappopup: React.FC<{
  text: any;
  showheader: any;
  records: any;
  onClose: () => void;
}> = ({ text, records, onClose, showheader }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [startTime, setStartTime] = useState('00:01');
  const [endTime, setEndTime] = useState('23:30');
  const [startDate, setStartDate] = useState<string>(
    () => new Date().toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState<string>(
    () => new Date().toISOString().split('T')[0],
  );
  const [selectedMarker, setSelectedMarker] = useState<any>(null); // To store selected marker data

  const MapReports = useSelector(
    (state: any) => state?.userReport?.RootHistory || [],
  );
  const imeiRecords = useSelector(
    (state: any) => state?.userReport?.singleRecordsImei,
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_KEY || 'YOUR_API_KEY',
  });

  useEffect(() => {
    if (records?.imei && (records?.startTime || records?.First_Ignition)) {
      const payload: any = {
        imei: records.imei,
        startdate: formatDateTime(records.startTime || records.Last_Ignition),
        enddate: formatDateTime(records.endTime || records.First_Ignition),
      };
      dispatch(RootHistorys(payload));
    }
  }, [records, dispatch]);

  useEffect(() => {
    if (text == 'Route History') {
      fetchMapReports();
    }
    const payload: any = {};
    dispatch(RootHistorysSetBlank(payload));
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getUTCDate()).padStart(2, '0')} ${String(
      date.getUTCHours(),
    ).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
  };

  const fetchMapReports = async () => {
    const payload: any = {
      imei: imeiRecords.imei,
      startdate: `${startDate} ${startTime}`,
      enddate: `${endDate} ${endTime}`,
    };
    dispatch(RootHistorys(payload));
  };

  const pathCoordinates:any = Array.from(
    new Map(
      MapReports?.map((vehicle: any) => [
        `${vehicle?.trackingData?.location?.latitude},${vehicle?.trackingData?.location?.longitude}`, // Unique key
        {
          lat: vehicle?.trackingData?.location?.latitude,
          lng: vehicle?.trackingData?.location?.longitude,
          speed: vehicle?.trackingData?.speed || 0, // Speed
          time: vehicle?.trackingData?.timestamp || '', // Timestamp
        },
      ])
    ).values()
  );
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[90%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          <RxCross2 />
        </button>
        <h1 className="py-1 text-[#000000] text-center text-[20px] font-medium leading-[24px] font-[Satoshi]">
          {text}
        </h1>

        {showheader && (
          <div className="flex flex-wrap gap-5 mb-4">
            {/* Start Date */}
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setEndDate(e.target.value);
              }}
              className="w-full md:w-auto py-2 px-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Start Time */}
            <select
              className="w-20 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {DateAndTime.map((time: any, index: any) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {/* End Time */}
            <select
              className="w-20 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {DateAndTime.map((time: any, index: any) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {/* Submit Button */}
            <button
              onClick={fetchMapReports}
              className="w-full md:w-[200px] bg-[#000000]  text-[#D9E821] py-2 rounded-lg font-medium transition"
            >
              Submit
            </button>
          </div>
        )}

        <div style={{ height: '80%', width: '100%' }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={pathCoordinates[0] || { lat: 28.183788, lng: 76.619042 }}
              zoom={13}
            >
              {pathCoordinates?.map((point: any, index: any) => (
                <Marker
                  key={`marker-${index}`}
                  position={{ lat: point.lat, lng: point.lng }}
                  label={{
                    text: (index + 1).toString(),
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                  onClick={() => setSelectedMarker(point)} // Handle marker click
                />
              ))}
          

              {pathCoordinates.length > 1 && (
                <Polyline
                  path={pathCoordinates}
                  options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  }}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mappopup;
