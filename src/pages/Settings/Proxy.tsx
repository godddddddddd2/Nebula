import { motion } from "framer-motion";
import { tabContentVariant, settingsPageVariant } from "./Variants";
import Dropdown from "./Dropdown";
import BareInput from "./BareInput";
import WispInput from "./WispInput";
import ProxyInput from "./ProxyInput";
import { changeTransport } from "../../util/transports";
import { useTranslation } from "react-i18next";

const Proxy = ({ id, active }) => {
  const { t } = useTranslation();

  const engines = [
    { id: "automatic", label: t("settings.proxy.automatic") },
    { id: "ultraviolet", label: "Ultraviolet" },
    { id: "rammerhead", label: "Rammerhead" },
    { id: "dynamic", label: "Dynamic" }
  ];

  const proxyModes = [
    { id: "embed", label: t("settings.proxymodes.embed") },
    { id: "direct", label: t("settings.proxymodes.direct") },
    { id: "aboutblank", label: t("settings.proxymodes.aboutblank") }
  ];

  const searchEngines = [
    { id: "https://duckduckgo.com/?q=%s", label: "DuckDuckGo" },
    { id: "https://google.com/search?q=%s", label: "Google" },
    { id: "https://bing.com/search?q=%s", label: "Bing" }
  ];

  const wispUrl =
    (location.protocol === "https:" ? "wss://" : "ws://") +
    location.host +
    "/wisp/";
  const transports = [
    { id: "epoxy", label: "Epoxy" },
    { id: "libcurl", label: "Libcurl" }
  ];

  return (
    <motion.div
      role="tabpanel"
      id={id}
      className="tab-content"
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
    >
      <motion.div
        variants={settingsPageVariant}
        className="content-card flex w-full flex-row flex-wrap justify-center gap-4"
      >
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            {t("settings.proxy.title")}
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            {t("settings.proxy.subtitle")}
          </div>
          <Dropdown storageKey="proxy" options={engines} refresh={false} />
        </div>
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            {t("settings.proxymodes.title")}
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            {t("settings.proxymodes.subtitle")}
          </div>
          <Dropdown
            storageKey="proxyMode"
            options={proxyModes}
            refresh={false}
          />
        </div>
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            {t("settings.search.title")}
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            {t("settings.search.subtitle")}
          </div>
          <Dropdown
            storageKey="searchEngine"
            options={searchEngines}
            refresh={false}
          />
        </div>
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            {t("settings.bare.title")}
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            {t("settings.bare.subtitle")}
          </div>
          <BareInput placeholder="/bare/" storageKey="bare" />
        </div>
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            Wisp Server
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            Enter the url of a Wisp server
          </div>
          <WispInput placeholder={wispUrl} />
        </div>
        <div className="flex h-64 w-80 flex-col flex-wrap content-center items-center rounded-lg border border-input-border-color bg-lighter p-2 text-center">
          <div className="p-2 text-3xl font-bold text-input-text">
            Transport
          </div>
          <div className="text-md p-4 font-bold text-input-text">
            Select the transport to use
          </div>
          <Dropdown
            storageKey="transport"
            options={transports}
            refresh={false}
            onChange={(value) => changeTransport(value, wispUrl)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Proxy;
