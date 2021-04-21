export const useQuery = (q?: string): string => {
  switch (q) {
    case 'delete':
      break;
    default:
      break;
  }

  return `
      { 
        getTodos {
        id, text
      } 
    }
    `;
};
