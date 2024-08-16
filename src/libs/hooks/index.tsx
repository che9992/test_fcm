import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMoment } from "./useMoment";
import { useRouteOnload } from "./useRouteOnload";
import { useSafeArea } from "./useSafeArea";
import { useStopSwipe } from "./useStopSwipe";
import { useUid } from "./useUid";
import { useReturnFilesImage } from "./useReturnFilesImage";
import { usePlatformOs } from "./usePlatformOs";
import { useNotification } from "./useNotification";
import { useViewportHeight } from "./useViewportHeight";
import { useTanstackQuery } from "./useTanstackQuery";
import { useFilesUpload } from "./useFilesUpload";
import { uploadFilesCloudinary } from "./useCloudinary";
import { useClickOutside } from "./useClickOutSide";
import { useFileDownload } from "./useFileDownload";

export {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useTanstackQuery,
  useMoment,
  useRouteOnload,
  useUid,
  useStopSwipe,
  useSafeArea,
  useLocalStorage,
  useReturnFilesImage,
  usePlatformOs,
  useNotification,
  useViewportHeight,
  useFilesUpload,
  uploadFilesCloudinary,
  useClickOutside,
  useFileDownload,
};
