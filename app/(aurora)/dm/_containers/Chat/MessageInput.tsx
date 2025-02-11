import { useState, useRef, useEffect } from 'react';
import { Button } from '@/_components/ui/button';
import { Textarea } from '@/_components/ui/textarea';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // テキストエリアの高さを自動調整
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || isLoading) return;

    try {
      setIsLoading(true);
      await onSend(content);
      setContent('');
      
      // 送信後にテキストエリアの高さをリセット
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter で改行
        return;
      } else {
        // Enter のみで送信
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-h-[40px] max-h-[200px] resize-none bg-gray2 border-gray1 text-white1 whitespace-pre-wrap"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!content.trim() || isLoading}
        className="h-10 w-10 bg-gray2 hover:bg-gray3 self-end"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}