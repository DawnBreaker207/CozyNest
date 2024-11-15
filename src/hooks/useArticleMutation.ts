import { SubmitHandler } from 'react-hook-form';
import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addArticle, editArticle, removeArticle } from '@/services/article';
import IArticle from '@/types/article';
import { ArticleZodSchema } from '@/validations/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

type useArticleMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE';
  onSuccess?: () => void;
};

const useArticleMutation = ({ action, onSuccess }: useArticleMutationProps) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const form = useForm<IArticle>({
    resolver: zodResolver(ArticleZodSchema),
    defaultValues: {
      title: '',
      content: [{ heading: '', paragraph: '', images: [] }],
      author: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (article: IArticle) => {
      switch (action) {
        case 'CREATE':
          return await addArticle(article);
        case 'DELETE':
          if (!article._id) throw new Error("Article ID is required for deletion");
          return await removeArticle(article); 
        case 'UPDATE':
          if (!article._id) throw new Error("Article ID is required for updating");
          return await editArticle(article);
        default:
          throw new Error('Invalid action type');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ARTICLE_KEY'] });
      setStatus('success');
      onSuccess && onSuccess();
    },
    onError: () => {
      setStatus('error');
    },
  });

  // Use effect to handle messages outside of render
  useEffect(() => {
    if (status === 'success') {
      message.success('Action completed successfully');
    } else if (status === 'error') {
      message.error('Failed to perform the action');
    }
  }, [status, messageApi]);

  // Form submit handler to trigger mutation
  const onSubmit: SubmitHandler<IArticle> = async (article) => {
    console.log("Submitting article:", article);
    mutation.mutate(article);
  };
  return { form, onSubmit, contextHolder, ...mutation };
};

export default useArticleMutation;
