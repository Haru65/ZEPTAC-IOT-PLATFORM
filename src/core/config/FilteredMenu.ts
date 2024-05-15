import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'; // Import ref from Vue

// Define the MenuItem interface
export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

// Define the MenuConfig interface
export interface MenuConfig {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    keenthemesIcon?: string;
    bootstrapIcon?: string;
    sub?: Array<MenuItem>;
}

// Define the useFilteredMenu function
export function useFilteredMenu(menuConfig: MenuItem[], modules: string[]) {
    const filteredMenu: MenuItem[] = [];

    filteredMenu.push(...menuConfig.filter((item) => {
      // Check if the item has a route and if it's in company_modules
      if (item.route && modules.includes(item.route)) {
        return true;
      }
      return false;
    }));

    return filteredMenu;
}