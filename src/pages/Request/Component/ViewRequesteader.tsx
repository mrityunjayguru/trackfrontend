import React, { useState } from 'react';
import { formatDateToDDMMMYYYYwithTime } from '../../../common/ManageDate';
import LogPopup from '../../../common/LogPopup';

interface SubscriberHeaderProps {
  SingleSubscriber: any;
}

const SubscriberHeader: React.FC<SubscriberHeaderProps> = ({ SingleSubscriber }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup
  };

  // Safeguard to ensure createdByUser exists and is the first element in the array
  const createdByUser = SingleSubscriber?.subscriber?.createdByUser?.[0] || null;

  return (
    <div>
      <div className="flex gap-10 px-1">
        <h1 className="text-[#000000] text-xl">
          {SingleSubscriber?.subscriber?.subscribeType || 'No Subscription Type Available'}
        </h1>
        <div>
          {createdByUser ? (
            <>
              <p className="text-[#000000]">
                {createdByUser.role === 'Dealer' ? 'Dealer Name' : 'Admin Name'}{' '}
                <span className="text-[#9F9EA2]">
                  {createdByUser.Name || 'N/A'}
                </span>
              </p>
              <p className="text-[#000000]">
                {createdByUser.role === 'Dealer' ? 'Dealer Code' : 'Admin Code'}{' '}
                <span className="text-[#9F9EA2]">
                  {createdByUser.uniqueCode || 'N/A'}
                </span>
              </p>
            </>
          ) : (
            <p className="text-[#9F9EA2]">No creator information available</p>
          )}
        </div>

        {/* Popup Toggle Icon */}
        {/* <div className="flex gap-1">
          <svg
            className="cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={togglePopup}
          >
            <g clipPath="url(#clip0_406_73)">
              <path
                d="M9.99958 0C4.47746 0 0 4.47746 0 9.99958C0 15.5217 4.47746 20 9.99958 20C15.5217 20 20 15.5217 20 9.99958C20 4.47746 15.5217 0 9.99958 0ZM12.0813 15.498C11.5666 15.7012 11.1568 15.8552 10.8495 15.9619C10.5431 16.0686 10.1867 16.1219 9.78116 16.1219C9.1581 16.1219 8.67302 15.9695 8.32762 15.6656C7.98222 15.3617 7.81037 14.9765 7.81037 14.5084C7.81037 14.3263 7.82307 14.1401 7.84847 13.9505C7.87471 13.7608 7.91619 13.5475 7.97291 13.3079L8.61714 11.0324C8.67386 10.814 8.72296 10.6066 8.7619 10.4135C8.80085 10.2188 8.81947 10.0402 8.81947 9.87767C8.81947 9.58815 8.75937 9.38497 8.64 9.27069C8.51894 9.1564 8.29122 9.10053 7.95175 9.10053C7.78582 9.10053 7.61481 9.12508 7.43958 9.17672C7.26603 9.23005 7.11534 9.27831 6.99175 9.32571L7.1619 8.62476C7.58349 8.45291 7.9873 8.30561 8.37249 8.1837C8.75767 8.06011 9.12169 7.99915 9.46455 7.99915C10.0834 7.99915 10.5608 8.14984 10.8969 8.44783C11.2313 8.74667 11.3998 9.13524 11.3998 9.6127C11.3998 9.71175 11.3879 9.88614 11.3651 10.135C11.3422 10.3848 11.299 10.6125 11.2364 10.8216L10.5956 13.0904C10.5431 13.2724 10.4965 13.4806 10.4542 13.7134C10.4127 13.9462 10.3924 14.124 10.3924 14.2434C10.3924 14.5448 10.4593 14.7505 10.5947 14.8597C10.7285 14.9689 10.963 15.0239 11.2948 15.0239C11.4514 15.0239 11.6267 14.996 11.8248 14.9418C12.0212 14.8876 12.1634 14.8394 12.2531 14.7979L12.0813 15.498ZM11.9678 6.2891C11.669 6.56677 11.3092 6.70561 10.8885 6.70561C10.4686 6.70561 10.1062 6.56677 9.80487 6.2891C9.50518 6.01143 9.35365 5.67365 9.35365 5.27915C9.35365 4.8855 9.50603 4.54688 9.80487 4.26667C10.1062 3.98561 10.4686 3.84593 10.8885 3.84593C11.3092 3.84593 11.6698 3.98561 11.9678 4.26667C12.2667 4.54688 12.4165 4.8855 12.4165 5.27915C12.4165 5.6745 12.2667 6.01143 11.9678 6.2891Z"
                fill="#D9E821"
              />
            </g>
            <defs>
              <clipPath id="clip0_406_73">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div> */}
      </div>
      <div className="border-b-2 border-[#D9E821]"></div>

      {/* LogPopup Component */}
      <LogPopup
        isOpen={isPopupOpen}
        togglePopup={togglePopup}
        records={SingleSubscriber?.userDetails}
      />
    </div>
  );
};

export default SubscriberHeader;
