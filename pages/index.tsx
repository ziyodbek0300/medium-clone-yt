import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({posts}: Props) {
  return (
    <div className="">
      <Head>
        <title  >Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>Medium</span>{" "} 
            is a place to write, read and connect</h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>
        
        <img src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png' className='mx-auto hidden md:inline-flex h-32 lg:h-full' alt='' />
      </div>
      
      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group rounded-lg overflow-hidden border cursor-pointer'>
              <img 
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                src={
                  urlFor(post.mainImage).url()!
                } alt="" />
              <div className='flex justify-between p-5 bg-white'>
                <div className=''>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>

                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}
