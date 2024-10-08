export default function CancelIcon({ size = 22, fill = '#ccc', ...props }: AssetType) {
  return (
    <svg width={size} height={size} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'>
      <path
        id='xIcon'
        d='M26.334,7.95a13,13,0,1,0,0,18.384,13,13,0,0,0,0-18.384M19.761,21.286l-2.619-2.619-2.621,2.621A1.079,1.079,0,0,1,13,19.761l2.621-2.621L13,14.525A1.079,1.079,0,0,1,14.526,13l2.616,2.617L19.758,13a1.076,1.076,0,0,1,1.522,1.522l-2.616,2.616,2.621,2.619-.23.23.23-.23a1.079,1.079,0,0,1-1.526,1.526'
        transform='translate(-4.141 -4.142)'
        fill={fill}
      />
    </svg>
  );
}
