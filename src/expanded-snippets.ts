export const snippets = [
  {
    id: 'react-useeffect-cleanup',
    title: 'useEffect com cleanup',
    language: 'typescript',
    code: `useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`,
    description: 'Hook useEffect com funcao de limpeza para event listeners',
    tags: ['react', 'hooks', 'cleanup'],
    category: 'React'
  },
  {
    id: 'react-custom-hook',
    title: 'Custom Hook para API',
    language: 'typescript',
    code: `const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na requisicao');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};`,
    description: 'Hook customizado para requisicoes de API com loading e error handling',
    tags: ['react', 'hooks', 'api', 'typescript'],
    category: 'React'
  },
  {
    id: 'fetch-async-await',
    title: 'Fetch com async/await',
    language: 'typescript',
    code: `const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};`,
    description: 'Funcao generica para requisicoes HTTP com tratamento de erro',
    tags: ['javascript', 'api', 'async', 'typescript'],
    category: 'JavaScript'
  },
  {
    id: 'debounce-function',
    title: 'Funcao Debounce',
    language: 'typescript',
    code: `const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Uso em React
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    searchAPI(term);
  }, 300),
  []
);`,
    description: 'Implementacao de debounce para otimizar performance em buscas',
    tags: ['javascript', 'performance', 'debounce', 'typescript'],
    category: 'JavaScript'
  },
  {
    id: 'local-storage-hook',
    title: 'Hook para localStorage',
    language: 'typescript',
    code: `const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Erro ao ler localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Erro ao salvar no localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue] as const;
};`,
    description: 'Hook customizado para gerenciar localStorage com TypeScript',
    tags: ['react', 'hooks', 'localStorage', 'typescript'],
    category: 'React'
  }
];