export interface PluginConfig {
  doc?: any | null;
  allowSpace: boolean;
  hashtagTrigger: any;
  getSuggestions: any;
  getSuggestionsHTML: any;
  zIndex: number;
  users?:any;
}

export function getMentionsPlugin(configs: PluginConfig): any;
export function addMentionNodes(nodes: any): any;
export function addTagNodes(): any;
export function tagNode(): any;
export function mentionNode(): any;
