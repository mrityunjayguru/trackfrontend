import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export const DelearDeviceKey = (devicetypeDetails: any,DealerRecord:any=[]) => {
  let vehicleTypeData: any = localStorage.getItem('vehicleTypeData');
  let parsedata = JSON.parse(vehicleTypeData);
  const formattedVehicleTypes = parsedata?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,
    value: vehicle._id,
    icon: vehicle.icons,
  }));
  const dealearRecord: any = DealerRecord?.map((dealer: any) => ({
    label: dealer.uniqueCode,
    value: dealer._id,
  }));
  const formData = useSelector((state: any) => state?.subscriber?.formData);
  const singleDelear = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );

  const filed:any= [
    {
      label: 'IMEI No. *',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: '', // Dummy value
      disabled: false,
    },
    {
      label: 'vehicle Number *',
      name: 'vehicleNo',
      type: 'text',
      placeholder: 'Enter vehicle No.',
      value: "", // Dummy value
    },
    {
      label: 'Dealer Code *',
      name: 'dealerCode',
      type: 'select',
      placeholder: 'select Dealer Code',
      options: dealearRecord,
      value:singleDelear?._id,
      disabled: false,
  },
    {
      label: 'Device SIM No. *',
      name: 'deviceSimNumber',
      type: 'text',
      placeholder: 'Enter Device Mobile No.',
      value: '', // Dummy value
    },
    {
      label: 'Operator',
      name: 'operator',
      type: 'select',
      placeholder: 'Choose Operator', // Default value
      options: ['Airtel', 'Jio', 'Vodafone', 'Other'], // Example options
      value: 'Airtel', // Dummy value
    },
    {
      label: 'Vehicle Category *',
      name: 'vehicleType',
      type: 'select',
      placeholder: 'Select Vehicle Type',
      options:formattedVehicleTypes, // Example options
      value: '', // Dummy value (first option)
    },
    {
      label: 'Device Status *',
      name: 'deviceStatus',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'], // Example options
      value: 'Active', // Dummy value
    },
    {
      label: 'Display Parameters *',
      name: 'displayParameters',
      type: 'checkboxGroup',
      options: [
        { label: 'AC', value: 'AC' },
        { label: 'Relay / Immobiliser', value: 'Relay' },
        { label: 'GPS', value: 'GPS' },
        { label: 'Door', value: 'Door' },
        { label: 'GeoFencing', value: 'GeoFencing' },
        { label: 'Network', value: 'Network' },
        { label: 'Engine', value: 'Engine' },
        { label: 'Parking', value: 'Parking' },
        { label: 'Charging', value: 'Charging' },
        { label: 'Temperature', value: 'temperature' },
        { label: 'Humidity', value: 'humidity' },
        { label: 'bluetooth', value: 'bluetooth' },
    ],
   
      // value: ['AC', 'GPS','Relay'],
    },
    {
      label: 'Fuel Status *',
      name: 'fuelStatus',
      type: 'radioGroup',
      options: [
        { label: 'Off', value: 'Off' },
        { label: 'On', value: 'On' },
      ],
      value: 'Off', 
    },
   
     
    ]
    if(formData.fuelStatus=="On"){
      filed.push(
        {
          label: 'Output *',
          name: 'fuleOutput',
          type: 'select',
          placeholder: 'Select Fuel System',
          options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'], // Example options
          value: '', // Dummy value
        },
      )
    }
    if(formData.fuleOutput=="Anolage/Voltage" && formData.fuelStatus=="On"){
      filed.push( 
        {
        label: "Tank Capacity",
        name: "tankCapacity",
        type: "text",
        placeholder: "Enter Fuel Tank Capacity",
        required: true
      },
      {
        label: "Minimum Value",
        name: "minimumValue",
        type: "text",
        placeholder: "Enter Value",
        required: true
      },
      {
        label: "Fill Difference",
        name: "fillDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true
      },
      {
        label: "Data Filtration Level",
        name: "dataFiltrationLevel",
        type: "text",
        placeholder: "10",
        required: true
      },
      {
        label: "Maximum Value",
        name: "maximumValue",
        type: "text",
        placeholder: "Enter Value",
        required: true
      },
      {
        label: "Drain Difference",
        name: "drainDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true
      }
    )
      }
    if(formData.fuleOutput=="Anolage/Ble" && formData.fuelStatus=="On"){
filed.push(   {
  label: "Tank Capacity",
  name: "tankCapacity",
  type: "text",
  placeholder: "Enter Fuel Tank Capacity",
  required: true
},

{
  label: "Fill Difference",
  name: "fillDifference",
  type: "text",
  placeholder: "Enter Value",
  required: true
},
{
  label: "Data Filtration Level",
  name: "dataFiltrationLevel",
  type: "text",
  placeholder: "10",
  required: true
},

{
  label: "Drain Difference",
  name: "drainDifference",
  type: "text",
  placeholder: "Enter Value",
  required: true
})
    }
      return filed
};
