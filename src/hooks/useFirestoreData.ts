import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Guide {
  id: string;
  title: string;
  category: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: 'live' | 'testing' | 'coming';
}

export const useGuides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'guides'));
        setGuides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Guide)));
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  return { guides, loading };
};

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tools'));
        setTools(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool)));
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  return { tools, loading };
};

export const useExperiments = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'experiments'));
        setExperiments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experiment)));
      } catch (error) {
        console.error('Error fetching experiments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  return { experiments, loading };
};
