import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let buildingListeners: ((id: number | null, name: string) => void)[] = [];

export const useBuilding = () => {
    const navigate = useNavigate();
    const [buildingId, setBuildingIdState] = useState<number | null>(() => {
        const saved = localStorage.getItem('selectedBuildingId');
        return saved ? parseInt(saved) : null;
    });
    const [buildingName, setBuildingNameState] = useState<string>(() => {
        return localStorage.getItem('selectedBuildingName') || '';
    });

    useEffect(() => {
        const listener = (id: number | null, name: string) => {
            setBuildingIdState(id);
            setBuildingNameState(name);
        };
        buildingListeners.push(listener);
        return () => {
            buildingListeners = buildingListeners.filter(l => l !== listener);
        };
    }, []);

    const setBuilding = (id: number, name: string) => {
        localStorage.setItem('selectedBuildingId', id.toString());
        localStorage.setItem('selectedBuildingName', name);
        setBuildingIdState(id);
        setBuildingNameState(name);
        buildingListeners.forEach(l => l(id, name));
        navigate(`/manager?buildingId=${id}`, { replace: true });
    };

    return { buildingId, buildingName, setBuilding };
};