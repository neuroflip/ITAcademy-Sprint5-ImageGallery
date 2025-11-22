import { Button } from "@/components/ui/button"
import type ImageButtonProps from './ImageButton.d';

import './css/ImageButton.css';

const ImageButton = ({ onClick, text, className, size }: ImageButtonProps) => {
    return <Button variant="outline" className={ className } size={ size } onClick={ onClick }>{ text }</Button>
}

export default ImageButton;
