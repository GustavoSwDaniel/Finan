import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player';

const UserManualSideBar = () => {
  const videos = [
    {
      title: "Funcionarios",
      url: "https://youtu.be/i8w05aGgtqE"
    },
    {
      title: "Produtos",
      url: "https://youtu.be/zIKDNJsRyeA"
    },
    {
      title: "Pedidos",
      url: "https://youtu.be/q-QuDRZmv1Q"
    },
    {
      title: "Categorias",
      url: "https://youtu.be/99eKElB4TH0"
    },
    {
      title: "Cupons",
      url: "https://youtu.be/zQ2A30IWAMQ"
    },
    {
      title: "Processo de envio",
      url: "https://youtu.be/qqQf7ccPN1o"
    },
    {
      title: "Relatorios",
      url: "https://youtu.be/Cuyb2O90NBk"
    },
    {
      title: "Financeiro",
      url: "https://youtu.be/AHRLl42xkT0"
    },
  ];

  return (
    <div className="flex h-screen">
      <Tabs className="flex">
      <div className="w-64 bg-gray-100 border-r border-gray-200">
          <TabList className="flex flex-col">
            {videos.map((video, index) => (
              <Tab 
                key={index} 
                className="p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-200"
                selectedClassName="bg-gray-200 font-bold"
              >
                {video.title}
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="flex-1 p-6">
          {videos.map((video, index) => (
            <TabPanel key={index} className="w-full justify-center">
              <h2 className="text-2xl mb-4">{video.title}</h2>
                <ReactPlayer
                  key={video.url} // Adiciona uma chave única baseada na URL do vídeo
                  url={video.url} 
                  controls 
                  width='800px' 
                  height='450px' 
                />
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export default UserManualSideBar;
