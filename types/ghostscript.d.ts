declare module "@wasm-zoo/ghostscript" {
  export interface GhostscriptOutputFile {
    name: string;
    data: Uint8Array;
  }

  export interface GhostscriptExecutionResult {
    exitCode: number;
    stderr?: string;
    files: GhostscriptOutputFile[];
  }

  export interface GhostscriptInstance {
    exec(
      args: string[],
      options: {
        files: Array<{ name: string; data: Uint8Array }>;
        dirs?: string[];
        outputs?: string[];
      }
    ): Promise<GhostscriptExecutionResult>;
    dispose(): void;
  }

  export function load(): Promise<GhostscriptInstance>;
}
