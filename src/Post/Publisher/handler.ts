import { Store } from 'state-range';
import { PublisherProps, State } from './types';

abstract class PostPublisherHandler extends Store<any, PublisherProps> {
    onStateChange?(state: State): void;
    onTabChange?(t: string): void;
    onPublish?(state: State): void;
    onDraft?(state: State): void;
    onThumbnailClick?(): void;
    onSlugChange?(slug: string): void;

    setState(state: State) {
        const newState = {
            ...this.getMeta('state'),
            ...state
        };
        this.setMeta('state', newState);
        if (this.onStateChange) {
            this.onStateChange(newState);
        }
    }
}

export default PostPublisherHandler;
