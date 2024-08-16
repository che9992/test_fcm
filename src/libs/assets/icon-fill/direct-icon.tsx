export default function DirectIcon({
  size = 22,
  fill = "#555",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2399 6.4319C16.6074 5.61432 14.7611 5.32468 12.9567 5.60311C11.1524 5.88153 9.47923 6.71425 8.16917 7.98588C6.8591 9.25752 5.97695 10.9051 5.64494 12.7004C5.31292 14.4957 5.54748 16.3498 6.31611 18.0059C6.10319 17.9027 5.89571 17.7886 5.69449 17.6641C5.5727 17.582 5.44511 17.5088 5.31272 17.4452C5.18144 17.3904 5.0384 17.3698 4.89697 17.3853C4.77412 17.4018 4.6528 17.4282 4.53419 17.4642C3.83563 17.7249 3.09397 17.8507 2.34852 17.835C1.98897 17.7616 1.65897 17.5841 1.39967 17.3244C1.14038 17.0648 0.963256 16.7345 0.890402 16.3749C0.874722 15.6285 1.00053 14.8858 1.26118 14.1862C1.29722 14.0673 1.32362 13.9456 1.34013 13.8224C1.35447 13.68 1.33247 13.5363 1.27617 13.4047C1.21253 13.2729 1.13939 13.146 1.0573 13.0249C-1.20733 9.37412 0.545611 4.9498 2.75827 2.73514C3.88724 1.60657 5.28657 0.786105 6.82274 0.352027C8.35892 -0.0820497 9.9807 -0.11526 11.5334 0.255566C13.086 0.626392 14.5178 1.38888 15.692 2.47029C16.8662 3.5517 17.7437 4.91596 18.2409 6.4329L18.2399 6.4319Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.3154 21.147C14.3082 23.0078 10.6025 21.4948 8.85452 19.7478C8.13925 19.0335 7.57169 18.1852 7.18423 17.2515C6.79678 16.3178 6.59703 15.317 6.59638 14.3061C6.59506 12.2645 7.40483 10.306 8.84753 8.86142C10.2902 7.41686 12.2477 6.60459 14.2893 6.60327C16.3309 6.60196 18.2894 7.41172 19.7339 8.85442C21.5558 10.6783 22.9989 14.3211 21.1331 17.3263C21.0656 17.426 21.0055 17.5306 20.9532 17.6391C20.9072 17.7475 20.8893 17.8657 20.9012 17.9829C20.9148 18.0844 20.9365 18.1847 20.9662 18.2827C21.1801 18.8578 21.2836 19.4681 21.271 20.0816C21.2104 20.377 21.0645 20.648 20.8513 20.8612C20.6381 21.0744 20.3671 21.2203 20.0717 21.2809C19.4581 21.2936 18.8477 21.1898 18.2728 20.9751C18.1748 20.9454 18.0745 20.9236 17.973 20.9101C17.8562 20.8981 17.7382 20.916 17.6302 20.9621C17.5209 21.016 17.4157 21.0778 17.3154 21.147ZM12.0976 14.2981C12.0976 14.5155 12.0331 14.7281 11.9123 14.9089C11.7915 15.0897 11.6198 15.2306 11.4189 15.3138C11.218 15.397 10.997 15.4188 10.7838 15.3763C10.5705 15.3339 10.3746 15.2292 10.2209 15.0755C10.0671 14.9217 9.96243 14.7258 9.92001 14.5126C9.87759 14.2993 9.89936 14.0783 9.98257 13.8774C10.0658 13.6765 10.2067 13.5049 10.3875 13.3841C10.5682 13.2633 10.7808 13.1988 10.9982 13.1988C11.2898 13.1988 11.5694 13.3146 11.7756 13.5208C11.9817 13.7269 12.0976 14.0066 12.0976 14.2981ZM15.3956 14.2981C15.3956 14.5155 15.3311 14.7281 15.2103 14.9089C15.0895 15.0897 14.9178 15.2306 14.7169 15.3138C14.516 15.397 14.295 15.4188 14.0818 15.3763C13.8685 15.3339 13.6726 15.2292 13.5189 15.0755C13.3651 14.9217 13.2604 14.7258 13.218 14.5126C13.1756 14.2993 13.1974 14.0783 13.2806 13.8774C13.3638 13.6765 13.5047 13.5049 13.6855 13.3841C13.8662 13.2633 14.0788 13.1988 14.2962 13.1988C14.4412 13.1979 14.5849 13.2256 14.7191 13.2805C14.8533 13.3353 14.9753 13.4161 15.0781 13.5183C15.1809 13.6205 15.2625 13.742 15.3182 13.8758C15.3739 14.0096 15.4026 14.1532 15.4026 14.2981H15.3956ZM17.5942 15.3975C17.8117 15.3975 18.0242 15.333 18.205 15.2122C18.3858 15.0914 18.5267 14.9197 18.6099 14.7188C18.6931 14.5179 18.7149 14.2969 18.6724 14.0837C18.63 13.8704 18.5253 13.6745 18.3716 13.5208C18.2178 13.367 18.0219 13.2623 17.8087 13.2199C17.5954 13.1775 17.3744 13.1993 17.1735 13.2825C16.9726 13.3657 16.801 13.5066 16.6802 13.6874C16.5594 13.8681 16.4949 14.0807 16.4949 14.2981C16.4948 14.4433 16.5234 14.5871 16.5791 14.7212C16.6349 14.8553 16.7166 14.977 16.8197 15.0793C16.9227 15.1816 17.045 15.2625 17.1795 15.3173C17.314 15.3721 17.458 15.3996 17.6032 15.3985L17.5942 15.3975Z"
        fill={fill}
      />
    </svg>
  );
}
