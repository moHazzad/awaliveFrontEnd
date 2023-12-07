import  {  useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, notification, } from "antd";
import { FaGlobe } from "react-icons/fa6";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import en from '../../../assets/en.png'
import ar from '../../../assets/sa.jpg'
import { GlobalOutlined } from '@ant-design/icons';

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    flag: {en},
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
    flag: {ar},
  },
];

const LanguageDropdown = () => {
  const { t } = useTranslation();
  const currentLanguageCode = Cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('app_title');
  }, [currentLanguage, t]);

  const items = languages.map(({ code, name, flag }) => ({
    key: code,
    label: (
      <Space style={{ opacity: i18next.language === code ? 0.5 : 1 }}>
        <img src={flag} alt={name} className="w-10" style={{ opacity: i18next.language === code ? 0.5 : 1 }} />
        <span>{name}</span>
      </Space>
    ),
  }));

  const handleMenuClick = (e) => {
    i18next.changeLanguage(e.key);
    notification['warning']({
      message: 'Language Changed',
      description: `Language has been changed to ${languages.find(l => l.code === e.key).name}.`,
      placement: 'topRight',
      duration: 3.5, // duration in seconds
    });
  };

  return (
    <div className="language-select">
      <div className="flex justify-end items-center">
        <Dropdown
          menu={{ 
            onClick: handleMenuClick, 
            items 
          }}
          trigger={['click']}
        >
          <a className="cursor-pointer">
            <Space>
            <GlobalOutlined />
              <DownOutlined className="text-xs" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default LanguageDropdown;
