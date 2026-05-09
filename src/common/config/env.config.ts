export const EnvConfig = () => ({
    environment: process.env.STATE || 'dev',
    mongoUrl: process.env.MONGO_URL!,
    port: process.env.PORT!
})