import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaEvent } from "@/lib/metaEvents";

/**
 * Fires Meta PageView (Pixel + CAPI, deduplicated by event_id) on the
 * initial load and on every SPA route change.
 */
const MetaPageView = () => {
  const location = useLocation();

  useEffect(() => {
    trackMetaEvent("PageView");
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPageView;
