
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ThumbsUp, MessageCircle, Heart, Flag, Share2 } from 'lucide-react';
import { Discussion } from './DiscussionBoard';
import { motion } from 'framer-motion';

interface DiscussionDetailProps {
  discussion: Discussion;
  onBack: () => void;
  onAddComment: (content: string) => void;
}

const DiscussionDetail: React.FC<DiscussionDetailProps> = ({
  discussion,
  onBack,
  onAddComment,
}) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSubmitComment = () => {
    if (!commentContent.trim()) {
      setCommentError('Please enter a comment');
      return;
    }

    onAddComment(commentContent);
    setCommentContent('');
    setCommentError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Discussions
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
              <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{discussion.author}</h3>
              <p className="text-sm text-muted-foreground">{discussion.date}</p>
            </div>
          </div>
          <CardTitle className="text-2xl">{discussion.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {discussion.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-primary/5">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            {discussion.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {discussion.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4 mr-1" />
              {discussion.replies}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4 mr-1" /> Report
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-6 space-y-4">
        <h3 className="text-xl font-semibold">Comments ({discussion.comments?.length || 0})</h3>
        
        <Card>
          <CardContent className="pt-4">
            <Textarea
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className={commentError ? "border-destructive" : ""}
            />
            {commentError && <p className="text-destructive text-sm mt-1">{commentError}</p>}
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Button onClick={handleSubmitComment}>
              Post Comment
            </Button>
          </CardFooter>
        </Card>

        {discussion.comments && discussion.comments.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {discussion.comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <Card className="mb-4">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{comment.author}</h4>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                    </div>
                    <div className="pl-11">
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pl-11">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p className="text-muted-foreground">Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiscussionDetail;
