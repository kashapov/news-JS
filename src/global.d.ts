declare module '*.css';

declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_URL: string;
        readonly API_KEY: string;
    }
}

interface Process {
    env: NodeJS.ProcessEnv;
}

declare const process: Process;
