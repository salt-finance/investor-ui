<div>
  <div class="media media-comment">
    <img
      alt="Placeholder"
      class="avatar avatar-lg media-comment-avatar"
      src={userImage}
    />
    <div class="media-body">
      <div class="media-comment-text">
        <h6 class="h5 mt-0">{userName}</h6>
        <p class="text-sm lh-160">{text}</p>
        <div class="icon-actions">
          <a href="/" class="like active">
            <i class="ni ni-like-2"></i>
            <span class="text-muted">{likeCount} likes</span>
          </a>
          <a href="/">
            <i class="ni ni-curved-next"></i>
            <span class="text-muted">{shareCount} shares</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  interface Props {
    userImage?: string;
    userName?: string;
    text?: string;
    likeCount?: number;
    shareCount?: number;
  }

  let {
    userImage = 'img/theme/team-1.jpg',
    userName = 'Michael Lewis',
    text = 'Cras sit amet nibh libero nulla vel metus scelerisque ante sollicitudin. Cras purus odio vestibulum in vulputate viverra turpis.',
    likeCount = 0,
    shareCount = 0
  }: Props = $props();
</script>
