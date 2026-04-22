/**
 * Coding pattern definitions.
 * Each pattern includes: id, formalName, name (nautical), icon, color,
 * tagline, metaphor, whenToUse[], timeComplexity, spaceComplexity,
 * template (Python starter code), problems[], insights[].
 *
 * Problems are cross-referenced to src/data/problems.js via the `leet` field.
 */

/** @type {Array<import('./types').Pattern>} */
export const PATTERNS = [
  {
    id:'two-pointers', formalName:'Two Pointers', name:'The Twin Helms',
    icon:'⛵', color:'#00c4b8',
    tagline:'Navigate convergence from bow and stern',
    metaphor:'Picture two helmsmen — one at the bow, one at the stern — sending signals toward each other across the deck. When their signals meet, you have your answer. This pattern works whenever you need to find a pair or validate something across two ends of a sorted sequence without retracing your steps.',
    whenToUse:['sorted array','pair sum target','palindrome check','remove duplicates','container water','three-sum variants'],
    timeComplexity:'O(n)', spaceComplexity:'O(1)',
    template:`def two_pointers(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current = arr[left] + arr[right]

        if current == target:
            return [left, right]   # found!
        elif current < target:
            left += 1              # need more
        else:
            right -= 1             # need less

    return []  # no result found`,
    problems:[
      {title:'Two Sum II',difficulty:'easy',leet:'167',desc:'Sorted array, find pair summing to target. Classic Twin Helms — start at ends, converge inward.'},
      {title:'Valid Palindrome',difficulty:'easy',leet:'125',desc:'Two helms compare characters from both ends, marching inward until they cross.'},
      {title:'Container With Most Water',difficulty:'medium',leet:'11',desc:'Maximize trapped water. Move the shorter helm inward — only the shorter side can improve the area.'},
      {title:'3Sum',difficulty:'medium',leet:'15',desc:'Fix one element, then Twin Helms on the rest. Sort first. Skip duplicates carefully.'},
    ],
    insights:[
      {icon:'🔑',text:'The array MUST be sorted (or sortable) for Two Pointers to give O(n). If unsorted and you need pairs, consider a HashSet approach instead.'},
      {icon:'🚩',text:'Spot it when the problem says: sorted array + find pair/triplet + target sum. That combination is almost always Two Pointers.'},
      {icon:'⚡',text:'"Beyond Cracking" tip: verbalize your pointer movement logic aloud — "I move left because the sum is too low." Interviewers want to hear the WHY.'},
      {icon:'🌊',text:'For "remove duplicates in-place," use a write-pointer (slow) and read-pointer (fast) — this is the same pattern, just repurposed.'},
    ]
  },
  {
    id:'sliding-window', formalName:'Sliding Window', name:'The Lookout Scope',
    icon:'🔭', color:'#7c6cff',
    tagline:'Sweep a contiguous scope across the horizon',
    metaphor:"The lookout's scope slides along the horizon — never jumping, always covering a contiguous stretch of water. You don't recalculate what you already surveyed; you just adjust the edges. This pattern transforms O(n²) nested loop problems into clean O(n) sweeps.",
    whenToUse:['max/min subarray size k','longest substring with constraint','minimum window substring','anagram in string','at most K distinct'],
    timeComplexity:'O(n)', spaceComplexity:'O(k) or O(alphabet)',
    template:`# Fixed window
def fixed_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Variable window
def variable_window(s):
    left = 0
    window = {}
    result = 0

    for right in range(len(s)):
        # Expand: add s[right]
        window[s[right]] = window.get(s[right], 0) + 1

        # Shrink while invalid
        while len(window) > k:
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1

        result = max(result, right - left + 1)
    return result`,
    problems:[
      {title:'Maximum Average Subarray I',difficulty:'easy',leet:'643',desc:'Fixed window of size k. Add new element, remove leftmost. Pure lookout scope.'},
      {title:'Longest Substring Without Repeating',difficulty:'medium',leet:'3',desc:'Variable window. Expand right; when duplicate enters scope, shrink from left.'},
      {title:'Minimum Window Substring',difficulty:'hard',leet:'76',desc:'Find smallest window containing all target chars. Shrink aggressively once valid.'},
      {title:'Permutation in String',difficulty:'medium',leet:'567',desc:'Fixed window = len(s1). Slide and compare character frequency maps at each step.'},
    ],
    insights:[
      {icon:'🔑',text:'Fixed window: size never changes. Variable window: expand until invalid, then shrink until valid. These are two distinct recipes.'},
      {icon:'🚩',text:'Signal words: "contiguous subarray/substring," "at most K distinct," "longest/shortest window," "all characters of target."'},
      {icon:'⚡',text:'The core optimization: never re-examine what is inside the scope. Remove old, add new. One pass, O(n).'},
      {icon:'🌊',text:'Use a HashMap for character frequency tracking. The "at most K" trick: maintain a count of distinct elements, shrink when it exceeds K.'},
    ]
  },
  {
    id:'fast-slow', formalName:'Fast & Slow Pointers', name:'Scout & Fleet',
    icon:'⚡', color:'#ff6b9d',
    tagline:'The scout races ahead; the fleet holds steady pace',
    metaphor:"Send a swift scout vessel racing at double speed while the main fleet holds steady. If they ever meet again on the water, there must be a closed loop in the route — they've been sailing in circles. Floyd's cycle detection, mapped to the sea.",
    whenToUse:['detect cycle in linked list','find cycle start','middle of linked list','happy number','palindrome linked list'],
    timeComplexity:'O(n)', spaceComplexity:'O(1)',
    template:`def has_cycle(head):
    slow, fast = head, head

    while fast and fast.next:
        slow = slow.next          # one step
        fast = fast.next.next     # two steps

        if slow == fast:
            return True  # cycle detected!

    return False

# Find cycle START after detection:
# Reset slow = head
# Move both at speed 1
# They meet exactly at cycle entrance`,
    problems:[
      {title:'Linked List Cycle',difficulty:'easy',leet:'141',desc:'Scout and fleet: do they ever meet? Return True if the route loops.'},
      {title:'Linked List Cycle II',difficulty:'medium',leet:'142',desc:'Find WHERE the cycle starts. Reset slow to head after detection, march both at speed 1.'},
      {title:'Middle of Linked List',difficulty:'easy',leet:'876',desc:'Scout at 2x speed. When scout hits end, fleet is at the middle. Elegant.'},
      {title:'Happy Number',difficulty:'easy',leet:'202',desc:'Apply the pattern to the digit-square sequence. If you loop back, it is not happy.'},
    ],
    insights:[
      {icon:'🔑',text:"Floyd's proof: if a cycle exists, fast WILL lap slow. The math guarantees meeting. The cycle-start trick uses the meeting point's properties."},
      {icon:'🚩',text:'Spot it: "no extra space," "linked list," "cycle detection," "find middle." Also applies to any sequence that can be modeled as a function f(x).'},
      {icon:'⚡',text:'For middle-finding, Scout & Fleet beats length-counting: one pass vs two passes, same O(n) but half the work.'},
      {icon:'🌊',text:'The cycle-start proof: distance from head to cycle start equals distance from meeting point to cycle start. Trust this — derive it once, memorize it forever.'},
    ]
  },
  {
    id:'binary-search', formalName:'Binary Search', name:"The Navigator's Bisection",
    icon:'🗺️', color:'#00d4aa',
    tagline:'Halve the charts. Find truth in logarithmic leaps.',
    metaphor:"A master navigator never searches the entire chart — they bisect. Is our destination east or west of the midpoint? Eliminate half the ocean with one decisive ruling. Binary search is disciplined elimination on sorted seas.",
    whenToUse:['sorted array search','rotated sorted array','find boundary condition','search in 2D matrix','kth smallest','minimize/maximize with feasibility'],
    timeComplexity:'O(log n)', spaceComplexity:'O(1)',
    template:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2  # prevents overflow

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1   # search right half
        else:
            right = mid - 1  # search left half

    return -1  # not found

# "Bisect on the answer" template:
def min_feasible(lo, hi, is_feasible):
    while lo < hi:
        mid = (lo + hi) // 2
        if is_feasible(mid):
            hi = mid       # try smaller
        else:
            lo = mid + 1   # need larger
    return lo`,
    problems:[
      {title:'Binary Search',difficulty:'easy',leet:'704',desc:'The canonical bisection. Commit this template to muscle memory — everything else derives from it.'},
      {title:'Search in Rotated Sorted Array',difficulty:'medium',leet:'33',desc:'Determine which half is sorted. Then binary search normally within that sorted half.'},
      {title:'Find Minimum in Rotated Array',difficulty:'medium',leet:'153',desc:'Bisect: if arr[right] > arr[mid], minimum is in left half. Classic elimination.'},
      {title:'Koko Eating Bananas',difficulty:'medium',leet:'875',desc:'Binary search on the ANSWER space (eating speed), not the array index. Bisect the speed range.'},
    ],
    insights:[
      {icon:'🔑',text:'Binary search on the answer: if you can write a monotonic is_feasible(x) function, bisect the answer range. Koko, capacity, etc. all follow this.'},
      {icon:'🚩',text:'Signals: "find minimum/maximum satisfying condition," "sorted," "O(log n) required." Sorted 2D matrices too — treat as 1D.'},
      {icon:'⚡',text:'Use mid = left + (right - left) // 2 in Java/C++ to prevent integer overflow. Python handles big integers natively so it matters less.'},
      {icon:'🌊',text:'Three templates: find exact value, find left boundary, find right boundary. The boundary variants differ in how they handle arr[mid] == target. Know all three.'},
    ]
  },
  {
    id:'dfs', formalName:'Depth-First Search', name:'Deep Sea Sonar',
    icon:'🌊', color:'#ff8c42',
    tagline:'Plunge to the deepest trench before surfacing',
    metaphor:"Your sonar pulse dives straight down — exploring every depth before pinging sideways. DFS commits fully to a path, follows it to its end, then backtracks. Essential for tree traversal, graph exploration, and discovering hidden structure.",
    whenToUse:['tree traversal all orders','graph components','path finding','cycle detection','topological sort','island counting','backtracking'],
    timeComplexity:'O(V + E)', spaceComplexity:'O(V) recursion stack',
    template:`# Graph DFS (iterative, avoids stack overflow)
def dfs_graph(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

# Tree DFS (recursive — clean and expressive)
def dfs_tree(node):
    if not node:
        return base_case

    left = dfs_tree(node.left)    # dive left
    right = dfs_tree(node.right)  # dive right
    return combine(left, right, node.val)`,
    problems:[
      {title:'Number of Islands',difficulty:'medium',leet:'200',desc:'DFS from each unvisited land cell, marking all connected land. Count how many dives you need to start.'},
      {title:'Max Area of Island',difficulty:'medium',leet:'695',desc:'DFS returns area of each island. Track the maximum across all dives.'},
      {title:'Clone Graph',difficulty:'medium',leet:'133',desc:'DFS with a HashMap mapping old nodes to new clones. Dive and clone simultaneously.'},
      {title:'Course Schedule',difficulty:'medium',leet:'207',desc:'DFS cycle detection on directed graph. Three states: unvisited, in-progress (cycle risk), done.'},
    ],
    insights:[
      {icon:'🔑',text:'For grids: DFS with 4-directional neighbors. Always bounds-check and visited-check before diving into a cell. Mark visited on entry.'},
      {icon:'🚩',text:'Spot it: "connected components," "path exists," "all paths," "number of islands," any tree problem. DFS is usually the first instinct for trees.'},
      {icon:'⚡',text:'Recursive DFS can overflow the call stack on deep inputs (long linked list, dense graph). Know the iterative version — explicit stack, same logic.'},
      {icon:'🌊',text:'"Beyond Cracking" move: state your base cases explicitly before writing a line. "If node is null, return 0." Interviewers love structured thinking.'},
    ]
  },
  {
    id:'bfs', formalName:'Breadth-First Search', name:'Harbor Chart',
    icon:'🏝️', color:'#4ecdc4',
    tagline:'Survey every port at this depth before sailing deeper',
    metaphor:"A harbor master charts every dock at depth one before moving to depth two. BFS guarantees the shortest path on unweighted waters — by the time you reach a destination, you've taken the minimal number of legs to get there.",
    whenToUse:['shortest path unweighted','level-order traversal','min steps to target','multi-source spreading','word ladder','bipartite check'],
    timeComplexity:'O(V + E)', spaceComplexity:'O(V)',
    template:`from collections import deque

def bfs(graph, start, target):
    visited = {start}
    queue = deque([(start, 0)])  # (node, distance)

    while queue:
        node, dist = queue.popleft()

        if node == target:
            return dist  # shortest path found

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))

    return -1  # unreachable`,
    problems:[
      {title:'Binary Tree Level Order',difficulty:'medium',leet:'102',desc:'Classic BFS. Snapshot queue size at each level start — those are your level nodes.'},
      {title:'Rotting Oranges',difficulty:'medium',leet:'994',desc:'Multi-source BFS — enqueue ALL rotten oranges at step 0. Minutes = BFS levels elapsed.'},
      {title:'Word Ladder',difficulty:'hard',leet:'127',desc:'Each word is a node. Edge if they differ by one character. BFS gives minimum transformations.'},
      {title:'Walls and Gates',difficulty:'medium',leet:'286',desc:'Multi-source BFS from all gates simultaneously. Fill minimum distances outward to each empty room.'},
    ],
    insights:[
      {icon:'🔑',text:'BFS guarantees shortest path in UNWEIGHTED graphs. For weighted graphs with non-negative edges, use Dijkstra. Know when each applies.'},
      {icon:'🚩',text:'"Minimum number of steps/hops/moves" = BFS. "Shortest path" with uniform cost = BFS. "Levels" or "layers" = BFS.'},
      {icon:'⚡',text:'Multi-source BFS: add ALL starting nodes to the queue at distance 0. They spread simultaneously — models fire, infection, distance-from-nearest-X perfectly.'},
      {icon:'🌊',text:'Mark visited WHEN ENQUEUING, not when dequeuing. This prevents the same node from being added to the queue multiple times and causing O(V²) behavior.'},
    ]
  },
  {
    id:'dynamic-programming', formalName:'Dynamic Programming', name:"The Captain's Log",
    icon:'📜', color:'#f7c59f',
    tagline:"Record every decision. Never recalculate the past.",
    metaphor:"The Captain's Log records every course correction and its outcome. When you face the same waters again, you consult the log — never recalculating what's already been charted. DP transforms exponential brute-force into polynomial elegance through disciplined record-keeping.",
    whenToUse:['overlapping subproblems','optimal substructure','counting paths/ways','max/min with choices','knapsack variants','string matching/editing'],
    timeComplexity:'O(n²) or O(n×m)', spaceComplexity:'O(n) to O(n×m)',
    template:`# Top-down: Memoization (add cache to recursion)
from functools import lru_cache

@lru_cache(maxsize=None)
def dp_top(n):
    if n <= 1:
        return n  # base case
    return dp_top(n - 1) + dp_top(n - 2)  # recurrence

# Bottom-up: Tabulation (build up from base cases)
def dp_bottom(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1  # base cases

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]  # transition

    return dp[n]

# Space-optimized (keep only what you need):
def dp_optimized(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    problems:[
      {title:'Climbing Stairs',difficulty:'easy',leet:'70',desc:'Fibonacci framing. The canonical example of overlapping subproblems. Master this before anything else.'},
      {title:'Coin Change',difficulty:'medium',leet:'322',desc:'Min coins to make amount. dp[i] = min(dp[i - coin] + 1) for each valid coin.'},
      {title:'Longest Common Subsequence',difficulty:'medium',leet:'1143',desc:'2D DP table. Classic string problem. Build row by row — spot the recurrence from the structure.'},
      {title:'Partition Equal Subset Sum',difficulty:'medium',leet:'416',desc:'0/1 Knapsack variant. 1D DP array, iterate backwards to prevent reuse.'},
    ],
    insights:[
      {icon:'🔑',text:'DP = smart recursion. If your recursive solution recomputes the same subproblems: memoize the results. That is the entire idea.'},
      {icon:'🚩',text:'Ask yourself: (1) Optimal substructure — does the optimal solution use optimal sub-solutions? (2) Overlapping subproblems? Yes to both = DP.'},
      {icon:'⚡',text:'Start with brute-force recursion. Draw the recursion tree. Circle the repeated nodes. Those repeated calls are exactly what memoization eliminates.'},
      {icon:'🌊',text:'Space optimization: many 2D DP problems only need the previous row at each step. Coin change, knapsack, and LCS all compress to 1D. Show this in interviews.'},
    ]
  },
  {
    id:'heaps', formalName:'Heaps / Priority Queue', name:'Cargo Manifest',
    icon:'⚖️', color:'#c77dff',
    tagline:'Always surface the most critical cargo first',
    metaphor:"The cargo manifest always surfaces the highest-priority item — heaviest, most valuable, most urgent. A heap is a manifest that reorders itself automatically with every addition or removal, keeping the critical item at the top in O(log n).",
    whenToUse:['k largest/smallest elements','merge k sorted lists','top-k frequent','median data stream','task scheduling','Dijkstra shortest path'],
    timeComplexity:'O(n log k)', spaceComplexity:'O(k)',
    template:`import heapq  # Python uses MIN-heap by default

# K Largest Elements
def k_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # drop the smallest
    return list(heap)  # k largest survive

# K Smallest: negate values to simulate max-heap
# heapq.heappush(heap, -num)

# Merge k sorted lists
def merge_k(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    result = []
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][j+1], i, j+1))
    return result`,
    problems:[
      {title:'Kth Largest Element',difficulty:'medium',leet:'215',desc:'Min-heap of size k. When full, pop the minimum — the k largest always survive.'},
      {title:'Top K Frequent Elements',difficulty:'medium',leet:'347',desc:'Count with Counter, then min-heap of size k on (frequency, element) pairs.'},
      {title:'Find Median from Data Stream',difficulty:'hard',leet:'295',desc:'Two heaps: max-heap for lower half, min-heap for upper half. Balance them after each insert.'},
      {title:'Task Scheduler',difficulty:'medium',leet:'621',desc:'Max-heap on task frequencies. Always schedule most frequent available task. Simulate with cooldown.'},
    ],
    insights:[
      {icon:'🔑',text:"Python's heapq is a MIN-heap. For max-heap: negate values. For complex objects: heappush tuples — Python compares element by element."},
      {icon:'🚩',text:'"K largest/smallest/frequent/closest" → heap. When k is much less than n, heap beats sorting: O(n log k) vs O(n log n). Know when k matters.'},
      {icon:'⚡',text:'The two-heap pattern for streaming medians: max-heap holds lower half, min-heap holds upper half. After each insert, rebalance so sizes differ by at most 1.'},
      {icon:'🌊',text:'heapify() on an existing list = O(n). Building a heap by individually pushing n elements = O(n log n). Know the difference — it comes up.'},
    ]
  },
  {
    id:'backtracking', formalName:'Backtracking', name:'Course Correction',
    icon:'🧩', color:'#ff6b6b',
    tagline:'Chart every route. Abandon the dead ends fast.',
    metaphor:"The navigator explores every possible route through the archipelago, placing a buoy at each waypoint. When a route hits a dead end or breaks the rules, they pull the last buoy and try the next branch. Backtracking is systematic exploration with disciplined retreat.",
    whenToUse:['all combinations/subsets/permutations','constraint satisfaction','maze solving','N-Queens','Sudoku solver','word search on grid'],
    timeComplexity:'O(n!) or O(2^n)', spaceComplexity:'O(n) recursion depth',
    template:`def backtrack(candidates, path, result, start=0):
    # Base case: commit the solution
    if is_valid_solution(path):
        result.append(path[:])  # SNAPSHOT the path
        return

    for i in range(start, len(candidates)):
        # Prune: skip branches that cannot lead anywhere
        if not is_promising(candidates[i], path):
            continue

        path.append(candidates[i])           # CHOOSE
        backtrack(candidates, path, result, i + 1)
        path.pop()                            # UN-CHOOSE`,
    problems:[
      {title:'Subsets',difficulty:'medium',leet:'78',desc:'At each element: include or skip. No pruning needed — all subsets are valid solutions.'},
      {title:'Combination Sum',difficulty:'medium',leet:'39',desc:'Candidates can repeat. Pass same index on recursive call. Prune when sum exceeds target.'},
      {title:'Permutations',difficulty:'medium',leet:'46',desc:'No start index — all positions eligible each time. Use a "used" boolean array to avoid reuse.'},
      {title:'Word Search',difficulty:'medium',leet:'79',desc:'DFS + backtracking on 2D grid. Mark cells visited in-place (then restore on backtrack).'},
    ],
    insights:[
      {icon:'🔑',text:'Three sacred steps: CHOOSE (add to path), EXPLORE (recurse deeper), UN-CHOOSE (pop from path). Restore ALL state on the way back up.'},
      {icon:'🚩',text:'"Find all solutions," "generate all X," "every possible combination/permutation" → backtracking. Optimization problems (find best) usually prefer DP.'},
      {icon:'⚡',text:'PRUNE early and prune aggressively. Sort candidates first. Skip duplicates. Stop when sum exceeds target. Pruning is the difference between 2 seconds and 2 hours.'},
      {icon:'🌊',text:'"Beyond Cracking" power move: draw the decision tree on the whiteboard BEFORE coding. Show your interviewer the structure. Then code naturally from it.'},
    ]
  },
  {
    id:'graphs', formalName:'Graphs', name:'The Trade Routes',
    icon:'🕸️', color:'#43aa8b',
    tagline:'Chart connections. Conquer the network.',
    metaphor:"Every port is a node; every shipping lane is an edge. Trade routes form the graph of commerce. Graph algorithms find optimal paths between ports, detect monopolistic cycles, and discover isolated archipelagos. The sea IS a graph.",
    whenToUse:['weighted shortest path','topological ordering','union-find connectivity','strongly connected components','minimum spanning tree','network flow'],
    timeComplexity:'Dijkstra: O((V+E) log V)', spaceComplexity:'O(V + E)',
    template:`# Dijkstra — weighted shortest path
import heapq
def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    heap = [(0, start)]

    while heap:
        cost, node = heapq.heappop(heap)
        if cost > dist[node]:
            continue  # stale entry, skip
        for neighbor, weight in graph[node]:
            if cost + weight < dist[neighbor]:
                dist[neighbor] = cost + weight
                heapq.heappush(heap, (dist[neighbor], neighbor))
    return dist

# Union-Find — O(α) dynamic connectivity
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False  # already connected
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        return True`,
    problems:[
      {title:'Network Delay Time',difficulty:'medium',leet:'743',desc:'Dijkstra from source. Answer is the maximum of all shortest distances — or -1 if any node unreachable.'},
      {title:'Course Schedule II',difficulty:'medium',leet:'210',desc:"Topological sort via Kahn's BFS or DFS with finish-order. Cycle means no valid ordering."},
      {title:'Number of Connected Components',difficulty:'medium',leet:'323',desc:'Union-Find or DFS. Count how many times you initiate a new traversal/union operation.'},
      {title:'Redundant Connection',difficulty:'medium',leet:'684',desc:'Union-Find. The first edge that tries to union two already-connected nodes is the answer.'},
    ],
    insights:[
      {icon:'🔑',text:'Graph representation choice matters: adjacency list (most LeetCode), adjacency matrix (dense graphs), edge list (Kruskal MST). Pick deliberately.'},
      {icon:'🚩',text:'BFS → unweighted shortest path. Dijkstra → weighted, non-negative edges. Bellman-Ford → negative edges. Know the tradeoffs and when each applies.'},
      {icon:'⚡',text:'Union-Find with path compression + union by rank achieves O(α(n)) ≈ O(1) amortized. Perfect for dynamic connectivity — show this optimization.'},
      {icon:'🌊',text:'Topological sort only applies to DAGs (directed acyclic graphs). If a cycle exists, no valid ordering exists. Always detect and report cycles first.'},
    ]
  },
];
