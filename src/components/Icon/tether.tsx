import React from 'react';

export function Tether(props: React.SVGAttributes<{}>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0C18.6267 0 24 5.37333 24 12C24 18.6267 18.6267 24 12 24C5.37333 24 0 18.63 0 12C0 5.37 5.37333 0 12 0Z"
        fill="#26A17B"
      />
      <path
        d="M13.6896 10.6619V8.87524H17.773V6.15527H6.65628V8.87524H10.7396V10.6619C7.42295 10.8152 4.92627 11.4719 4.92627 12.2585C4.92627 13.0452 7.42295 13.7018 10.7396 13.8552V19.5718H13.693V13.8552C17.0063 13.7018 19.4963 13.0452 19.4963 12.2585C19.493 11.4719 17.003 10.8152 13.6896 10.6619ZM13.693 13.3718C13.6096 13.3752 13.183 13.4018 12.2296 13.4018C11.4663 13.4018 10.933 13.3818 10.743 13.3718V13.3752C7.81295 13.2452 5.62294 12.7352 5.62294 12.1252C5.62294 11.5152 7.80961 11.0052 10.743 10.8752V12.8618C10.9363 12.8752 11.483 12.9085 12.243 12.9085C13.153 12.9085 13.6096 12.8718 13.6963 12.8618V10.8685C16.623 10.9985 18.8063 11.5085 18.8063 12.1185C18.7997 12.7285 16.6163 13.2385 13.693 13.3718Z"
        fill="white"
      />
    </svg>
  );
}