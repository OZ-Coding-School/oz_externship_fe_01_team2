import { cn } from '../../utils/cn'
import { handleImageError } from '../../utils/handleImageError'

interface AvatarProps {
  name: string
  profileUrl: string
  className?: string
}

const Avatar = ({ name, profileUrl, className }: AvatarProps) => {
  return (
    <div className={cn(`rounded-full overflow-hidden w-12 h-12 ${className}`)}>
      <img
        src={profileUrl}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => handleImageError(e, 'avatar')}
      />
    </div>
  )
}

export default Avatar
