'use client';

import React, { useState } from 'react';
import {
    HomeIcon,
    FolderIcon,
    ChartBarIcon,
    ChevronDownIcon,
    Bars3Icon,
    DocumentPlusIcon,
    BuildingOfficeIcon,
    DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
    setActiveView: (view: 'dashboard' | 'addFile' | 'addProperty' | 'files' | 'properties' | 'perfil' | 'seguranca') => void;
    handleListFiles: () => void;
    handleListProperties: () => void;
    generatePDF: () => void;
    exportExcel: () => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
    setActiveView,
    handleListFiles,
    generatePDF,
    exportExcel,
    isSidebarOpen,
    handleListProperties,
    toggleSidebar
}) => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [activeLink, setActiveLink] = useState<'dashboard' | 'addFile' | 'addProperty' | 'files' | 'properties' | 'perfil' | 'seguranca'>('dashboard');

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const handleClickLink = (
        view: 'dashboard' | 'addFile' | 'addProperty' | 'perfil' | 'seguranca' | 'files' | 'properties',
        action?: () => void
    ) => {
        setActiveLink(view);
        setActiveView(view);
        if (action) action();
        if (typeof window !== "undefined" && window.innerWidth < 1024) toggleSidebar();
    };

    const simpleLinkClass = "flex items-center w-full p-2 transition duration-150 rounded-lg text-gray-800 hover:bg-gray-100";
    const subLinkClass = "text-left text-sm w-full py-2 px-2 rounded-lg transition duration-150 hover:bg-gray-50 text-gray-600";
    const sectionButtonClass = "flex items-center justify-between w-full p-2 transition duration-150 rounded-lg text-gray-800 hover:bg-gray-100";

    const LinkItem: React.FC<{ Icon: React.ElementType, title: string, section: string }> = ({ Icon, title, section }) => (
        <button onClick={() => toggleSection(section)} className={sectionButtonClass}>
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500" />
                <span>{title}</span>
            </div>
            <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${openSection === section ? 'rotate-180' : ''}`}
            />
        </button>
    );

    const SimpleLink: React.FC<{ Icon: React.ElementType, title: string, view: 'dashboard' | 'addFile' | 'addProperty', action?: () => void }> = ({ Icon, title, view, action }) => (
        <button onClick={() => handleClickLink(view, action)} className={simpleLinkClass}>
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500" />
                <span>{title}</span>
            </div>
        </button>
    );

    return (
        <>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white p-4 border-r border-gray-100
                    transition-transform duration-300 ease-in-out z-50
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:static lg:h-auto lg:z-auto lg:shadow-none
                    shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]
                `}
            >
                <div className="h-16 lg:h-4"></div> {/* espaço para o header */}

                <nav className="space-y-2 pt-4">
                    <SimpleLink Icon={HomeIcon} title="Dashboard" view="dashboard" />

                    <div>
                        <LinkItem Icon={FolderIcon} title="Gestão de Arquivos" section="arquivos" />
                        {openSection === 'arquivos' && (
                            <div className="ml-4 pt-1 space-y-1">
                                <button
                                    onClick={() => handleClickLink('files', handleListFiles)}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <span className="w-1 h-1 rounded-full mr-3" style={{ backgroundColor: '#25aff0' }}></span>
                                    Listar Arquivos
                                </button>
                                <button
                                    onClick={() => handleClickLink('addFile')}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <DocumentPlusIcon className="w-4 h-4 mr-3 text-gray-500" />
                                    Adicionar Nota
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <LinkItem Icon={BuildingOfficeIcon} title="Gestão de Imóveis" section="imoveis" />
                        {openSection === 'imoveis' && (
                            <div className="ml-4 pt-1 space-y-1">
                                <button
                                    onClick={() => handleClickLink('properties', handleListProperties)}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <span className="w-1 h-1 rounded-full mr-3" style={{ backgroundColor: '#25aff0' }}></span>
                                    Listar Imóveis
                                </button>
                                <button
                                    onClick={() => handleClickLink('addProperty')}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <DocumentPlusIcon className="w-4 h-4 mr-3 text-gray-500" />
                                    Adicionar Imóvel
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <LinkItem Icon={ChartBarIcon} title="Relatórios" section="relatorios" />
                        {openSection === 'relatorios' && (
                            <div className="ml-4 pt-1 space-y-1">
                                <button
                                    onClick={generatePDF}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <DocumentArrowDownIcon className="w-4 h-4 mr-3 text-red-500" />
                                    Exportar PDF
                                </button>
                                <button
                                    onClick={exportExcel}
                                    className={`${subLinkClass} flex items-center`}
                                >
                                    <DocumentArrowDownIcon className="w-4 h-4 mr-3 text-green-600" />
                                    Exportar Excel
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="absolute bottom-4 left-0 w-full px-4 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400 text-center">v1.4.0 - Notagest</p>
                </div>
            </aside>

            {/* Overlay mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Sidebar;
