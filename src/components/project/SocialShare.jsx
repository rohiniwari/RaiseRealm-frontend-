import { useState } from 'react';
import { Button } from '../ui/button';
import { MessageCircle, Twitter, Facebook, Linkedin, Copy } from 'lucide-react';

const SocialShare = ({ project }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Check out this project: ${project.title}`;

const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${project.title} - ${shareText} ${shareUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Share:</span>

      <button
        onClick={() => openShareWindow(shareLinks.whatsapp)}
        className="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md transition-all"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-5 w-5" />
      </button>


      <button
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </button>

      <button
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="p-2 rounded-lg text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </button>

      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Copy className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default SocialShare;