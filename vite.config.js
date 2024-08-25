import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
export default defineConfig({
    optimizeDeps: {
        include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
    },
    plugins: [react()],
    server: {
        host: true,
    },
});
